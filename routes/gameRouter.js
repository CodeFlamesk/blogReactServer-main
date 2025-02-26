const express = require("express");
const { getGames, createGame, getGameIdByParams } = require('../controllers/gameController');
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
router.get("/", getGames);

router.get("/:id", getGameIdByParams);

// Створити нову гру
router.post("/", upload.array("gameImages", 2), createGame);

module.exports = router; 