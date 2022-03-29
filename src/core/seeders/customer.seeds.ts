"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("customer", [
      {
        id: "496d840c-ae50-11ec-bc43-00d8610469d7",
        name: "User 1",
        info: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "496d8e34-ae50-11ec-bc43-00d8610469d7",
        name: "User 2",
        info: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "67dd1eb6-ae50-11ec-bc43-00d8610469d7",
        name: "User 3",
        info: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("customer", null, {});
  },
};
