const express = require("express");

const route = express.Router();

route.get("/", homeController.home);

module.exports = router;