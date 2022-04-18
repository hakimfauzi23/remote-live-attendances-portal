"use strict";
// import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    faker.setLocale("id_ID");
    const fakeEmployees = 20;
    let data = [];
    for (let i = 0; i < fakeEmployees; i++) {
      data.push({
        name: faker.name.findName(),
        address: faker.address.streetAddress(true),
        pob: faker.address.city(),
        dob: faker.date.past(10, "2001-01-01T00:00:00.000Z"),
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date(),
        jobTitleId: faker.random.number({ min: 1, max: 13 }),
        avatar: faker.image.avatar(),
      });
    }
    return queryInterface.bulkInsert("employees", data, {});
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
