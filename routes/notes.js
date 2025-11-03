// backend/routes/notes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2");

const router = express.Router();

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raghu@2634",
  database: "eduvault",
});

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Upload route
router.post("/upload", upload.single("file"), (req, res) => {
  const { subject, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const filename = req.file.filename;
  const filepath = `/uploads/${filename}`;

  db.query(
    "INSERT INTO uploads (subject, description, filename, filepath) VALUES (?, ?, ?, ?)",
    [subject, description, filename, filepath],
    (err) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, file: filepath });
    }
  );
});

// ✅ Fetch uploaded files by subject
router.get("/:subject", (req, res) => {
  const { subject } = req.params;
  db.query("SELECT * FROM uploads WHERE subject = ?", [subject], (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }
    res.json(results);
  });
});

module.exports = router;
