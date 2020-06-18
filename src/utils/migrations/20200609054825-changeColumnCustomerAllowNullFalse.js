'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   return [
    await queryInterface.changeColumn('Customers', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false
    }),

    await queryInterface.changeColumn('Customers', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false
    }),
    await queryInterface.changeColumn('Customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false
     })
  ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('Customers')
  }
};
