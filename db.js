// backend/db.js
const mysql = require("mysql2");
require("dotenv").config();

console.log("🔍 Loaded DB env:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "✅ SET" : "❌ NOT SET",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log("⏳ Attempting to connect to MySQL (with pool)...");

// ✅ Use createPool (more stable for cloud deployments)
const db = mysql.createPool({
  host: process.env.DB_HOST,        // Railway host
  user: process.env.DB_USER,        // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    // railway
  port: process.env.DB_PORT || 3306,
  ssl: { rejectUnauthorized: false }, // required for Railway SSL
  connectionLimit: 10,
});

// ✅ Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database successfully!");
    connection.release();
  }
});

module.exports = db;
