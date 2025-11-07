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

console.log("⏳ Attempting to connect to MySQL...");

// ✅ Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g. shinkansen.proxy.rlwy.net
  user: process.env.DB_USER,       // e.g. root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // e.g. railway
  port: process.env.DB_PORT,       // e.g. 10256
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: true } // ✅ Enable SSL for Railway (DO NOT skip)
});

// ✅ Verify connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database successfully!");
    conn.release();
  }
});

module.exports = db;
