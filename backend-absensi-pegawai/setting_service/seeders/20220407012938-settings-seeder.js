"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert(
      "settings",
      [
        {
          name: `Clock In`,
          description: `Time For Clock in start`,
          value: `{"value":"08:00"}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: `Clock Out`,
          description: `Time For Clock out start`,
          value: `{"value":"16:30"}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: `Memo`,
          description: `Text for displaying in the frontend page`,
          value: `{"value":"Welcome to the wfa absence!"}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: `Company Logo`,
          description: `Url that logo img is saved`,
          value: `{"value":"https://prokonbms.com/wp-content/uploads/2017/09/untuk-mitra-kami-shell.png"}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
