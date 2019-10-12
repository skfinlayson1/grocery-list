const express = require("express");
const router = express.Router();

const groceryItemController = require("../controller/grocery_item_controller")

router.post("/create-item", groceryItemController.createItem);

module.exports = router;