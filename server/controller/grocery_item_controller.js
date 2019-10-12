const groceryListQueries = require("../db/grocery_lists.queries");

module.exports = {

    // CREATE GROCERY ITEM
    createItem(req, res) {
        let values = req.body;
        groceryListQueries.findOne(values.username, values.groceryListName, (err, list) => {
            if (err || !list) {
                res.json("error");
            } else {
                groceryListQueries.createItem(list.id, values, (err, response) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("Item created")
                    }
                })                
            }

        })
    }

}