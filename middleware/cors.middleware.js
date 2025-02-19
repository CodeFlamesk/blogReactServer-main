function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // Обробка preflight запиту
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Відповідаємо на preflight запит статусом 200
    }

    next();
}

module.exports = cors;
