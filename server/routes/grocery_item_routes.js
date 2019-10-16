const express = require("express");
const router = express.Router();

const groceryItemController = require("../controller/grocery_item_controller");
const validation = require("./validations");

router.post("/create-item", validation.signedInValidator,
                            validation.createEditNewGroceryItemValidations,
                            validation.validator,
                            groceryItemController.createItem);

router.post("/update-item/:groceryListName/:itemName", validation.signedInValidator,
                                                       validation.createEditNewGroceryItemValidations,
                                                       validation.validator,
                                                       groceryItemController.updateItem);

router.post("/update-item-checkbox/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.updateCheckbox)

router.get("/find-item/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.findItem);

router.get("/delete-item/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.deleteItem);

module.exports = router;