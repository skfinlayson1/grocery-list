const express = require("express");
const router = express.Router();

const groceryListController = require("../controller/grocery_list_controller");
const validation = require("./validations");

router.get("/check-for-change", groceryListController.checkForChange);
router.get("/grocery-list/show/:name", validation.signedInValidator, groceryListController.find);
router.get("/grocery-list/edit/:name", validation.signedInValidator, groceryListController.find);

router.post("/create-list", validation.signedInValidator,
                            validation.createEditNewGroceryListValidations,
                            validation.validator,
                            groceryListController.createList);

router.post("/delete-list", validation.signedInValidator, groceryListController.deleteList);

router.post("/grocery-list/update/:name",   validation.signedInValidator,
                                            validation.createEditNewGroceryListValidations,
                                            validation.validator,
                                            groceryListController.update);

module.exports = router;