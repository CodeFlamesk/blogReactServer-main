const express = require("express");
const { getGames } = require('../controllers/gameController')
const router = express.Router();
/* const multer = require('multer');

const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
}); */

/* const upload = multer({ storage });
 */
// Отримати всі ігри
router.get("/", getGames);


// Отримати конкретну гру за ID
router.get("/:id", (req, res) => {
    res.send(`Get single game with ID: ${req.params.id}`);
});

// Створити нову гру
router.post("/", (req, res) => {
    res.send("Create game");
});

module.exports = router;
