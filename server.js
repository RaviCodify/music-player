const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = 3000;



mongoose.connect("mongodb+srv://anand261950:EBjzzo04swBVTmXe@music-player.jvg4h.mongodb.net/music-player");  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  

// Endpoint to get songs list
app.get('/songs', require("./routes/song"));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


