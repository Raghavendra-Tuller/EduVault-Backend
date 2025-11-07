// backend/server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./db"); // ✅ import the single shared DB connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Confirm DB connection was established
// (This runs when db.js connects successfully)
app.get("/testdb", (req, res) => {
  db.query("SELECT NOW() AS time", (err, results) => {
    if (err) {
      console.error("❌ Database test failed:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    console.log("✅ Database test query successful:", results);
    res.json({ success: true, time: results[0].time });
  });
});

// ✅ API routes
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 EduVault backend is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
