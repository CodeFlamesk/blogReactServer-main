require('dotenv').config();

function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
}

module.exports = cors;
