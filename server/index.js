const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi upload
const upload = multer({ dest: "uploads/" });

// Remove Background API
app.post("/remove-background", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const inputPath = req.file.path;
  const outputPath = `${inputPath}-output.png`;

  exec(`rembg i "${inputPath}" "${outputPath}"`, (error) => {
    if (error) {
      console.error("Rembg error:", error);
      return res.status(500).json({ error: "Failed to remove background" });
    }

    res.sendFile(path.resolve(outputPath), () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

// Jalankan server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
