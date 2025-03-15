const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const gameRouter = require("./gameRouter");
const teamRoleRouter = require("./teamRoleRouter");
const teamRouter = require("./teamRouter");

router.use("/user", userRouter);
router.use("/games", gameRouter);
router.use("/team-role", teamRoleRouter);
router.use("/teams", teamRouter);

module.exports = router;
