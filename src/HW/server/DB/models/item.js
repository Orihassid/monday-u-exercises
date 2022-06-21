'use strict';
const {
  Model
} = require('sequelize');
export default  (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    item_id: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_pokemon: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Item',
    tableName:'items',
    timestamps: false
  });
  Item.removeAttribute("id")
  return Item;
};