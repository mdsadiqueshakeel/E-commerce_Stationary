// src/utils/cartUtils.js

/**
 * Add a product to the cart in localStorage
 * @param {Object} product - The product to add to cart
 * @param {number} quantity - The quantity to add (default: 1)
 * @param {string} variant - The selected variant (optional)
 */
export const addToCart = (product, quantity = 1, variant = null) => {
  try {
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    let cart = [];
    
    if (existingCart) {
      cart = JSON.parse(existingCart);
    }
    console.log('Product being added to cart:', product);
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      String(item.id) === String(product.id) && 
      (variant ? item.variant === variant : true)
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variant || product.variant,
        quantity
      });
    }
    
    console.log('Cart before saving to localStorage:', cart);
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    return cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return [];
  }
};

/**
 * Remove a product from the cart
 * @param {string|number} productId - The ID of the product to remove
 * @param {string} variant - The variant to remove (optional)
 */
export const removeFromCart = (productId, variant = null) => {
  try {
    const existingCart = localStorage.getItem('cart');
    if (!existingCart) return [];
    
    let cart = JSON.parse(existingCart);
    
    // Filter out the product to remove
    cart = cart.filter(item => 
      !(item.id === productId && (variant ? item.variant === variant : true))
    );
    
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return [];
  }
};

/**
 * Get the current cart contents
 * @returns {Array} The cart items
 */
export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart retrieved from localStorage:', cart);
    return cart;
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

/**
 * Clear the entire cart
 */
export const clearCart = () => {
  localStorage.removeItem('cart');
};

/**
 * Update the quantity of a product in the cart
 * @param {string|number} productId - The ID of the product to update
 * @param {number} newQuantity - The new quantity to set
 * @param {string} variant - The variant to update (optional)
 * @returns {Array} The updated cart items
 */
export const updateCartItemQuantity = (productId, newQuantity, variant = null) => {
  try {
    const existingCart = localStorage.getItem('cart');
    if (!existingCart) return [];
    
    let cart = JSON.parse(existingCart);
    
    // Find the item to update
    const itemIndex = cart.findIndex(item => 
      String(item.id) === String(productId) && 
      (variant ? item.variant === variant : true)
    );
    
    if (itemIndex >= 0) {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart[itemIndex].quantity = newQuantity;
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch event to notify other components
      window.dispatchEvent(new Event('cartUpdated'));
    }
    
    return cart;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return [];
  }
};