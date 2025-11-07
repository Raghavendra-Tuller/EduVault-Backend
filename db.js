const mysql = require("mysql2");
require("dotenv").config();

console.log("🔍 Loaded DB env:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "✅ SET" : "❌ NOT SET",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL successfully!");
    conn.release();
  }
});

module.exports = db;
