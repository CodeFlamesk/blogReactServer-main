const Router = require("express");
const router = new Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.sendFeedback);



module.exports = router