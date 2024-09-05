const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const songsDir = path.join(__dirname, 'assets/songs');

// Serve static files
app.use(express.static(__dirname));


// Endpoint to get songs list
app.get('/songs', (req, res) => {
  fs.readdir(songsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    const songs = files.filter(file => file.endsWith('.mp3')).map(file => ({
      title: path.parse(file).name,
      file: file
    }));
    res.json(songs);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


