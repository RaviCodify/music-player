const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

router.get("/songs", async(req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
})





module.exports = router;