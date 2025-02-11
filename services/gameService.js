const mongoose = require('mongoose');

// Додати нову гру
router.post("/add", async (req, res) => {
    try {
        const { teams } = req.body;

        // Перевірити та конвертувати userId у формат ObjectId
        teams.forEach(team => {
            team.players.forEach(player => {
                if (player.userId) {
                    player.userId = mongoose.Types.ObjectId(player.userId); // Конвертуємо в ObjectId
                }
            });
        });

        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json({ message: "Game created successfully", game: newGame });
    } catch (error) {
        res.status(500).json({ message: "Error creating game", error: error.message });
    }
});
