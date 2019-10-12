const express = require("express");
const router = express.Router();

const groceryListController = require("../controller/grocery_list_controller");

router.get("/check-for-change", groceryListController.checkForChange);
router.get("/grocery-list/show/:name", groceryListController.find);
router.get("/grocery-list/edit/:name", groceryListController.edit);

router.post("/create-list", groceryListController.createList);
router.post("/delete-list", groceryListController.deleteList);
router.post("/grocery-list/update/:name", groceryListController.update);

module.exports = router;