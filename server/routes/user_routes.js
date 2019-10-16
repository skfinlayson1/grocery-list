const express = require("express");
const router = express.Router();

const authController = require("../controller/user_controller");
const validation = require("./validations");

router.get("/check-status", authController.checkStatus);
router.get("/logout", authController.signOut);

router.post("/sign-up", validation.createNewUserValidations, validation.validator, authController.signUp);
router.post("/sign-in", validation.signInUserValidations, validation.validator, authController.signIn);

module.exports = router;