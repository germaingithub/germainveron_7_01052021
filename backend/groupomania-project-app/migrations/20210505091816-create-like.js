'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable("Likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      //messageId
      message_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Messages",
          key: "id",
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: "gren",
        references: {
          model: "Users",
          key: "id",
        },
      },
      isLike: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};