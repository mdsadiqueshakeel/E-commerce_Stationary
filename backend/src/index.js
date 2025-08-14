const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const pool = require("./db.js");
const cookieParser = require('cookie-parser');
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/productRoutes/userRouters.js");
const adminRoutes = require("./route/productRoutes/adminRoutes.js");
const addressRoutes = require("./route/addressRoutes.js");
const cors = require('cors');
const app = express();
require('./utils/cleanupToken.js'); // Import the cron job for cleaning expired tokens

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // allow cookies
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', userRoutes);
app.use('/api/admin/products', adminRoutes);
app.use('/api/auth/addresses', addressRoutes);
// app.use("/",require('./route/testRoute'));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hi Backend is running 🚀");
});

// ✅ Test DB connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
    console.log("Database connection successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false, error: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
