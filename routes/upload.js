const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload file with subject name
router.post("/", upload.single("file"), (req, res) => {
  try {
    const subject = req.body.subject || "General";
    const filePath = `/uploads/${req.file.filename}`;

    // Save upload info in a JSON file
    const uploadsFile = path.join(__dirname, "../uploads/uploads.json");
    const existing = fs.existsSync(uploadsFile)
      ? JSON.parse(fs.readFileSync(uploadsFile))
      : [];

    existing.push({
      subject,
      name: req.file.originalname,
      path: filePath,
      uploadedAt: new Date(),
    });

    fs.writeFileSync(uploadsFile, JSON.stringify(existing, null, 2));

    res.json({ success: true, filePath });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// Get files by subject
router.get("/:subject", (req, res) => {
  const uploadsFile = path.join(__dirname, "../uploads/uploads.json");
  if (!fs.existsSync(uploadsFile)) return res.json([]);
  const allFiles = JSON.parse(fs.readFileSync(uploadsFile));
  const filtered = allFiles.filter(
    (f) => f.subject.toLowerCase() === req.params.subject.toLowerCase()
  );
  res.json(filtered);
});

module.exports = router;
