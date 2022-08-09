'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING
      },
      itemName: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      isPokemon: {
        type: Sequelize.BOOLEAN
      },
      pokemonId: {
        type: Sequelize.INTEGER
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};