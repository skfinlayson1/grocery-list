const groceryListQueries = require("../db/grocery_lists.queries");
const groceryItemQueries = require("../db/grocery_item.queries");

module.exports = {

// CREATE GROCERY ITEM ------------------------------------------------------------
    createItem(req, res) {
        let values = req.body;
        groceryListQueries.findOne(req.user.username, values.groceryListName, (err, list) => {
            if (err || !list) {
                res.json({messages: {errors: [ {msg: `Could not find a ${values.name} belonging to you`} ] }});
            } else {
                groceryItemQueries.createItem(list.id, values, (err) => {
                    if (err) {
                        res.json({messages: {errors: [ {msg: err.errors[0].message} ] }});
                    } else {
                        res.json("Item created")
                    }
                })                
            }

        })
    },

// FIND SPECIFIC GROCERY ITEM --------------------------------------------------------
    findItem(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.groceryListName, (err, list) => {
            if (err || !list) {
                res.json({messages: {errors: [ {msg: `Could not find a ${values.name} belonging to you`} ] }})
            } else {
                groceryItemQueries.findOne(list.id, req.params.itemName, (err, item) => {
                    if (err || !item) {
                        res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
                    } else {
                        res.json(item);
                    }
                })
            }
        })
    },

// UPDATE LIST ITEM ------------------------------------------------------------------
    updateItem(req, res) {
        const values = {
            name: req.body.name,
            quantity: req.body.quantity,
            location: req.body.location
        }
        groceryListQueries.findOne(req.user.username, req.params.groceryListName, (err, list) => {
            if (err || !list) {
                res.json({messages: {errors: [ {msg: "Error with update"} ] }});
            } else {
                groceryItemQueries.update(list.id, req.params.itemName, values, (err) => {
                    if (err) {
                        res.json({messages: {errors: [ {msg: err.errors[0].message}]}})
                    } else {
                        res.json("Updated");
                    }
                })
            }
        })
    },

// UPDATE CHECKBOX ------------------------------------------------------------------
    updateCheckbox(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.groceryListName, (err, list) => {
            if (err || !list) {
                res.json({messages: {errors: [ {msg: "Error with checkbox update"}]}})
            } else {
                groceryItemQueries.updateCheckbox(list.id, req.params.itemName, req.body.purchased, (err) => {
                    if (err) {
                        res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
                    } else {
                        res.json("Updated Checkbox")
                    }
                })
            }
        })
    },

// DELETE LIST ITEM ------------------------------------------------------------------
    deleteItem(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.groceryListName, (err, list) => {
            if (err || !list) {
                res.json({messges: {errors: [ {msg: err.errors[0].message} ] }})
            } else {
                groceryItemQueries.delete(list.id, req.params.itemName, (err) => {
                    if (err) {
                        res.json({messages: {errors: [ {msg: err.errors[0].message} ] }})
                    } else {
                        res.json("Deleted");
                    }
                })
            }
        })
    }

}