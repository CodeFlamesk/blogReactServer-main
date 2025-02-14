const express = require("express");
const { getGames, createGame } = require('../controllers/gameController')
const router = express.Router();
const multer = require('multer');

const path = require("path");
const storage = multer.diskStorage({
    destination: './static/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage });

// Отримати всі ігри
router.get("/", getGames);


// Отримати конкретну гру за ID
router.get("/:id", (req, res) => {
    res.send(`Get single game with ID: ${req.params.id}`);
});

// Створити нову гру
router.post("/", upload.array("gameImages", 2), createGame);

module.exports = router;
