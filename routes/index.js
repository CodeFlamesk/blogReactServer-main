const Router = require("express");
const router = new Router();

const categoryRouter = require("./categoryRouter");
const blogRouter = require("./blogRouter");
const userRouter = require("./userRouter");
const newsletterRouter = require("./newsletterRouter");
const commentRouter = require("./commentRouter");
const feedbackRouter = require("./feedbackRouter");
const askRouter = require("./askRouter");
const gameRouter = require("./gameRouter");
const teamRoleRouter = require("./teamRoleRouter");



router.use("/category", categoryRouter);
router.use("/blog", blogRouter);
router.use("/user", userRouter);
router.use("/newsletter", newsletterRouter);
router.use("/comments", commentRouter);
router.use("/feedback", feedbackRouter);
router.use("/ask", askRouter);
router.use("/games", gameRouter);
router.use('/team-role', teamRoleRouter);

module.exports = router;
