"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const choosenDate = [
      "2022-04-01",
      "2022-04-04",
      "2022-04-05",
      "2022-04-06",
      "2022-04-07",
      "2022-04-08",
      "2022-04-11",
      "2022-04-12",
      "2022-04-13",
      "2022-04-14",
      "2022-04-15",
      "2022-04-18",
      "2022-04-19",
      "2022-04-20",
      "2022-04-21",
      "2022-04-22",
      "2022-04-25",
      "2022-04-26",
      "2022-04-27",
      "2022-04-28",
      "2022-04-29",
    ];

    let data = [];
    choosenDate.map((e) => {
      for (let i = 1; i <= 25; i++) {
        data.push({
          employee_id: i,
          date: e,
          clock_in: "08:00:00",
          clock_out: "16:30:00",
          report: "check attendances!!",
          loc_in: `-7.811651218210718, 110.39283123825412`,
          loc_out: `-7.8052076223542, 110.39027705250238`,
        });
      }
    });
    return queryInterface.bulkInsert("absences", data, {});
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
