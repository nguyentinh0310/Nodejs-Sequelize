"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user", [
      {
        id: "933fe459-b95b-4156-a2cf-76f5076a4496",
        email: "admin@gmail.com",
        password:
          "$2a$12$iWY/sVUk9nUu5sm9cqqCnupu83g7zcnSk7xLlEjycs6BoZaM9rxYq",
        fullName: "Admin",
        projectId: "e060237c-ae4f-11ec-bc43-00d8610469d7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user", null, {});
  },
};
