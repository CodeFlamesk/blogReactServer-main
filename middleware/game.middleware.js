const express = require("express");
const path = require("path");

const app = express();

// Додаємо middleware для обробки статичних файлів
app.use("/static", express.static(path.join(__dirname, "static")));
