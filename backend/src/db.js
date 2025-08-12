// db.js
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,           // Force SSL
    rejectUnauthorized: false, // Ignore self-signed cert errors
  },
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL database connected successfully"))
  .catch((err) => console.error("❌ Error connecting to PostgreSQL database:", err));

module.exports = pool;
