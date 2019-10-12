'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroceryItem = sequelize.define('GroceryItem', {
    groceryListID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    purchased: DataTypes.BOOLEAN,
    location: DataTypes.STRING
  }, {});
  GroceryItem.associate = function(models) {
    // associations can be defined here
    GroceryItem.belongsTo(models.GroceryList, {
      foreignKey: "groceryListID",
      onDelete: "CASCADE"
    })

  };
  return GroceryItem;
};