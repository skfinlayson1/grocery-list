const groceryListQueries = require("../db/grocery_lists.queries");

module.exports = {

// CREATE GROCERY LIST ----------------------------------------------------------------
    createList(req, res) {
        groceryListQueries.create(req.body.username, req.body.name, (err, newList) => {
            if (err || !newList) {
                res.json("Error creating new list")
            } else {
                res.json("created new list");
            }
        })
    },

// FIND SPECIFIC GROCERY LIST --------------------------------------------------------
    find(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.name, (err, list) => {
            if (err) {
                res.json(err)
            } else if (!list) {
                res.json("No list exists");
            } else {
                res.json(list);
            }
        })
    },

// EDIT LIST --------------------------------------------------------------------------
    edit(req, res) {
        groceryListQueries.findOne(req.user.username, req.params.name, (err, list) => {
            if (err || !list) {
                res.json(err || "List could not be found");
            } else {
                res.json(list);
            }
        })
    },

// UPDATE LIST ------------------------------------------------------------------------
    update(req, res) {
        groceryListQueries.update(req.user.username, req.params.name, req.body, (err, response) => {
            if (err) {
                res.json(err)
            } else {
                res.json("Success");
            }
        })
    },

// DELETE LIST ------------------------------------------------------------------------
    deleteList(req, res) {
        groceryListQueries.deleteList(req.body.username, req.body.listName, (err, response) => {
            if (err) {
                res.json(err);
            } else {
                res.json("List Deleted");
            }
        })
    },

// CHECK FOR NEW GROCERY LISTS --------------------------------------------------------
    checkForChange(req, res) {
        if (req.user) {
             groceryListQueries.findLists(req.user.username, (err, lists) => {
                 if (err) {
                    res.json(err);
                 } else if (lists.length < 1) {
                    res.json("No grocery lists found")
                 } else {
                    res.json({data: lists})
                 }
             })
        } else {
            res.json("Not signed in")
        }
    }

}