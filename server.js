// backend/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./db"); // ✅ MongoDB connection

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
connectDB();

// ✅ Import and use routes
const uploadRoutes = require("./routes/upload");
app.use("/api/upload", uploadRoutes);

const notesRouter = require("./routes/notes");
app.use("/api/notes", notesRouter);

// ✅ Test MongoDB connection
app.get("/testdb", async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const state = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({
      success: true,
      status: states[state],
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 EduVault backend is running with MongoDB!");
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
