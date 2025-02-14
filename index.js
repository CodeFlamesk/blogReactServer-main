require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
const router = require("./routes/index"); // Правильний шлях до маршрутизації
/* const fileUpload = require("express-fileupload"); */
const fileMiddleware = require("./middleware/filePath.middleware");
const corsMiddleware = require("./middleware/cors.middleware");
const path = require("path");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");

/* app.use(fileUpload({})); */
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("static"));
app.use(fileMiddleware(path.resolve(__dirname, "static")));

// Підключаємо основний роутер
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
    try {
        // Підключення до MongoDB
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`);
        });
    } catch (e) {
        console.error("Error while connecting to MongoDB:", e);
        process.exit(1); // Завершення роботи сервера у випадку помилки
    }
};

start();
