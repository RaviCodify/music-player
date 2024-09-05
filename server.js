const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const songsDir = path.join(__dirname, "assets/songs");

// Serve static files (including uploaded songs)
app.use(express.static(__dirname));

// Serve the HTML file on the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint to get songs list
app.get("/songs", (req, res) => {
  fs.readdir(songsDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory: " + err);
    }
    const songs = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => ({
        title: path.parse(file).name,
        file: file,
      }));
    res.json(songs);
  });
});

// Init upload
const upload = multer({
  storage: multer.diskStorage({
    destination: "./assets/songs/", // Folder where files will be saved
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname        
      );
    },
  }),  
}).single("musicUpload");


// Upload Endpoint
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err.message });
    }

    res.send({
      message: "File uploaded successfully",
      file: `assets/songs/${req.file.filename}`      
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
