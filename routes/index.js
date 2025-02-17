const express = require("express");
const router = express.Router();

const categoryRouter = require("./categoryRouter");
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const newsletterRouter = require("./newsletterRouter");
const commentRouter = require("./commentRouter");
const feedbackRouter = require("./feedbackRouter");
const askRouter = require("./askRouter");
const gameRouter = require("./gameRouter");
const teamRouter = require("./teamRouter");
const roleRouter = require("./roleRouter");

router.use("/roles", roleRouter);

router.use("/category", categoryRouter);
router.use("/blog", blogRouter);
router.use("/user", userRouter);
router.use("/newsletter", newsletterRouter);
router.use("/comments", commentRouter);
router.use("/feedback", feedbackRouter);
router.use("/ask", askRouter);
router.use("/games", gameRouter);
router.use("/roles", roleRouter); // 🔹 Підключаємо роут для ролей
router.use("/team", teamRouter); // 🔹 Підключаємо роут для ролей

module.exports = router;
