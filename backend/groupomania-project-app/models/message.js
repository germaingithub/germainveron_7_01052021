"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      attachment: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      userId: {
        type: DataTypes.STRING,
        defaultValue: "gren",
      },
      //Comment: [],
    },
    {
      classMethods: {
        associate: function (models) {
          models.Message.belongsTo(models.User, {
            foreignKey: "userId",
            defaultValue: "userId",
            allowNull: false,
          })
          models.Message.hasMany(models.Comments);
        },
      },
    }
  );
  return Message;
};
