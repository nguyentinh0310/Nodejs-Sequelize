"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("project", [
      {
        id: "e060237c-ae4f-11ec-bc43-00d8610469d7",
        name: "react",
        description: "Front-end dev",
        startDate: "2022",
        customerId: "496d840c-ae50-11ec-bc43-00d8610469d7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "00326600-e20b-4ca8-8a79-6db659f9d4f3",
        name: "nodejs",
        description: "Back-end dev",
        startDate: "2021",
        customerId: "496d8e34-ae50-11ec-bc43-00d8610469d7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("project", null, {});
  },
};
