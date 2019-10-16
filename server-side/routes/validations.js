const { check, validationResult } = require("express-validator");

module.exports = {

    createNewUserValidations: [
        check("username", "Userame: must be five characters or longer").isLength({min: 5}),
        check("password", "Password: must be five characters or longer").isLength({min: 5}),
        check("email", "Email: must be a valid email").isEmail()
    ],

    signInUserValidations: [
        check("username", "Username: must be five characters or longer").isLength({min: 5}),
        check("password", "Password: must be five characters or longer").isLength({min: 5})
    ],

    createEditNewGroceryListValidations: [
        check("name", "Name: must be three characters or longer").isLength({min: 3})
    ],

    createEditNewGroceryItemValidations: [
        check("itemName", "Item Name: must contain atleast one character").isLength({min: 1}),
        check("quantity", "Quantity: must be an integer").isInt(),
        check("quantity", "Quantity: must be greater than zero").isInt({gt:0}),
        check("location", "Locations: must not be empty").not().isEmpty()
    ],

    signedInValidator(req, res, next) {
        if (!req.user) {
            res.json({messages:{errors: "You must be signed in to do that"}})
        } else {
            next();
        }
    },

    validator(req, res, next) {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.json({messages: errors})
        } else {
            next();
        }
    }

}