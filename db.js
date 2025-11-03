// backend/db.js
const mysql = require("mysql2");
require("dotenv").config();

// Debug log
console.log("🔍 Loaded DB env:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "✅ SET" : "❌ NOT SET",
  database: process.env.DB_NAME,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "eduvault",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database (from db.js)");
  }
});

module.exports = db;
