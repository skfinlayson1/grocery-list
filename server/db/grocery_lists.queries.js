const GroceryList = require("../db/models/index").GroceryList;
const GroceryItem = require("../db/models/index").GroceryItem;

module.exports = {

// CREATE NEW GROCERY LIST -------------------------------------------------
    create(username, listName, callback) {
        GroceryList.create({owner:username, name:listName})
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

// FIND ALL GROCERY LISTS RELATED TO THE USER -------------------------------
    findLists(username, callback) {
        GroceryList.findAll({where: {owner:username}})
        .then((lists) => {
            callback(null, lists);
        })
        .catch((err) => {
            callback(err);
        })
    },

// FIND ONE GROCERY LIST ---------------------------------------------------- 
    findOne(username, listName, callback) {
        GroceryList.findOne({where: {owner:username, name:listName}})
        .then((res) => {
            GroceryList.findByPk(res.id, {include: [{model: GroceryItem, as: "groceryitems"}]})
            .then((list) => {
                callback(null, list);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

// DELETE GROCERY LIST -----------------------------------------------------
    deleteList(username, listName, callback) {
        GroceryList.findOne({where: {owner:username, name:listName}})
        .then((user) => {
            GroceryList.destroy({where: {id: user.id}})
            .then((response) => {
                callback(null, response);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

// UPDATE GROCERY LIST ------------------------------------------------------
    update(username, groceryListName, values, callback) {
        GroceryList.findOne({where: {owner: username, name: groceryListName}})
        .then((list) => {
            list.update({name:values.name})
            .then((res) => {
                callback(null, res);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

// CREATE ITEM IN GROCERY LIST -----------------------------------------------
    createItem(groceryListId, values, callback) {
        const vals = {
            groceryListID: groceryListId,
            name: values.itemName,
            quantity: values.quantity,
            purchased: false,
            location: values.location
        }
        GroceryItem.create(vals)
        .then((response) => {
            callback(null, response);
        })
        .catch((err) => {
            callback(err);
        })
    }

}