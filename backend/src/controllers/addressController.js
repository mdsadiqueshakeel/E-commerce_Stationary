const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const NodeGeocoder = require("node-geocoder");

// list all addresses for the logged-in user (for address page)
async function getAddresses(req, res) {
  const userId = req.user.id; // Get the user ID from the authenticated request

  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!addresses) {
      return res.json({ addresses: [] });
    }

    if (addresses.length === 0) {
      return res.json({ addresses: [] });
    }

    res.json({ addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create a new address with a hard limit of 4 addresses per user
async function addAddresses(req, res) {
  const userId = req.user.id;

  try {
    // Check if the user already has 4 addresses
    const existingAddresses = await prisma.address.count({
      where: { userId },
    });

    if (existingAddresses >= 4) {
      return res
        .status(400)
        .json({
          error:
            "You can only save 4 addresses. Please delete one before to add a new one.",
        });
    }

    // Force first address to default, otherwise set isDefault to false
    const isDefault = existingAddresses === 0 ? true : !!req.body.isDefault;
    const {
      label,
      fullName,
      phone,
      street,
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    let created;
    if (isDefault) {
      // If this should be the default address, unset any existing default address (safety) then create the new address
      const [_, addr] = await prisma.$transaction([
        prisma.address.updateMany({
          where: { userId, isDefault: true },
          data: {
            isDefault: false
          },
        }),
        prisma.address.create({
          data: {
            label,
            fullName,
            phone,
            street,
            line1,
            line2,
            city,
            state,
            postalCode,
            country: "India", // Assuming country is always India
            user: { connect: { id: userId } },
            isDefault: true, // Set this address as default
          },
        }),
      ]);

      created = addr;
    } else {
      // Create a new address without setting it as default
      created = await prisma.address.create({
        data: {
          label,
          fullName,
          phone,
          street,
          line1,
          line2,
          city,
          state,
          postalCode,
          country: "India", // Assuming country is always India
          isDefault: false, // Set to false if not the first address
          user: { connect: { id: userId } },
        },
      });
    }

    res.json({ message: "Address added successfully", created });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update fields of an existing address
// if isDefault is true is passed, it becomes only default for that user.
async function updateAddress(req, res) {
  const userId = req.user.id;
  const { addressId } = req.params;

  try {
    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
      include: { user: true },
    });
    //         console.log("Match check:", existingAddress.userId === userId);
    // console.log("Lengths:", existingAddress.userId.length, userId.length);
    // console.log("userId raw:", JSON.stringify(userId));
    // console.log("existingAddress.userId raw:", JSON.stringify(existingAddress.userId));

    //         console.log("req.user.id", userId);
    // console.log("Address ID param", addressId);
    // console.log("Existing address", existingAddress);

    if (!addressId) {
      return res.status(400).json({ error: "Address ID is required" });
    }
    if (!existingAddress || existingAddress.userId.trim() !== userId.trim()) {
      return res
        .status(404)
        .json({ error: "Address not found or does not belong to the user" });
    }

    const wantsDefault = req.body.hasOwnProperty("isDefault")
      ? !!req.body.isDefault
      : null;

    let updated;
    const {
      label,
      fullName,
      phone,
      street,
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    if (wantsDefault === true) {
      // Ensure only one address can be default
      const [_, addr] = await prisma.$transaction([
        prisma.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        }),
        prisma.address.update({
          where: { id: addressId },
          data: {
            label: label || existingAddress.label,
            fullName: fullName || existingAddress.fullName,
            phone: phone || existingAddress.phone,
            street: street || existingAddress.street,
            line1: line1 || existingAddress.line1,
            line2: line2 || existingAddress.line2,
            city: city || existingAddress.city,
            state: state || existingAddress.state,
            postalCode: postalCode || existingAddress.postalCode,
            country: country || existingAddress.country,
            isDefault: true, // Set this address as default
          },
        }),
      ]);

      updated = addr;
    } else {
      // Normal update (do not let isDefault become false if it's the only address)
      updated = await prisma.address.update({
        where: { id: addressId },
        data: {
          label,
          fullName,
          phone,
          street,
          line1,
          line2,
          city,
          state,
          postalCode,
          country,
          ...(wantsDefault === false ? { isDefault: false } : {}),
        },
      });
    }
    res.json({ message: "Address updated successfully", updated });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete an address
async function deleteAddress(req, res) {
  const userId = req.user.id;
  const { addressId } = req.params;

  try {
    const existingAddress = await prisma.address.findUnique({
      where: { id: addressId },
      include: { user: true },
    });

    if (!existingAddress || existingAddress.userId.trim() !== userId.trim()) {
      return res
        .status(404)
        .json({ error: "Address not found or does not belong to the user" });
    }

    const wasDefault = existingAddress.isDefault;

    await prisma.address.delete({
      where: { id: addressId },
    });

    console.log("req.user.id", userId);
    console.log("Address ID param", addressId);
    console.log("Existing address", existingAddress);

    if (wasDefault) {
      // If the deleted address was default, set the first available address as default
      const newDefault = await prisma.address.findFirst({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });

      if (newDefault) {
        await prisma.address.update({
          where: { id: newDefault.id },
          data: { isDefault: true },
        });
      }
    }

    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to auto-fill address based on geolocation (placeholder)
async function autoFillAddressFromGeolocation(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  const options = {
    provider: "openstreetmap",
    // Optionnal depending of the providers
    // fetch: function() { /* ... */ },
    // apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    // formatter: null         // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  try {
    const resGeo = await geocoder.reverse({
      lat: latitude,
      lon: longitude,
    });

    if (resGeo && resGeo.length > 0) {
      const address = resGeo[0];
      const formattedAddress = {
        label: "",
        fullName: "", // You might need to get this from user profile or leave empty
        phone: "", // You might need to get this from user profile or leave empty
        street: address.streetName || address.streetNumber || "",
        line1:  address.formattedAddress || "",
        line2: address.extra?.neighborhood || address.extra?.sublocality || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.zipcode || "",
        country: address.countryCode || "",
      };
      console.log('Formatted Address:', formattedAddress);
      res.json({
        message: "Address autofilled successfully",
        address: formattedAddress,
      });
    } else {
      res
        .status(404)
        .json({ error: "No address found for the given coordinates." });
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    res.status(500).json({ error: "Internal server error during geocoding." });
  }
}

module.exports = {
  getAddresses,
  addAddresses,
  updateAddress,
  deleteAddress,
  autoFillAddressFromGeolocation,
};
