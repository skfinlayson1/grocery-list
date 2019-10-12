const express = require("express");
const router = express.Router();

const authController = require("../controller/authenticate_controller");

router.get("/check-status", authController.checkStatus);
router.get("/logout", authController.signOut);

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);

module.exports = router;