"use strict";
var uuid = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("project_user", [
      {
        id: uuid.v4(),
        projectId: "e060237c-ae4f-11ec-bc43-00d8610469d7",
        userId: "933fe459-b95b-4156-a2cf-76f5076a4496",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid.v4(),
        projectId: "00326600-e20b-4ca8-8a79-6db659f9d4f3",
        userId: "933fe459-b95b-4156-a2cf-76f5076a4496",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("project-user", null, {});
  },
};
