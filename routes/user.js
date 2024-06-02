const express = require("express");
const router = express();
const auth = require("../middlewares/auth");
const { sign_up, log_in, profile } = require("../controllers/user");

router.post("/sign_up", sign_up);
router.post("/log_in", log_in);
router.post("/profile", auth, profile);

module.exports = router;
