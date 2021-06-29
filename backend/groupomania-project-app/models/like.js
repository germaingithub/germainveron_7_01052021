
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      message_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Message",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        defaultValue: "1",
        references: {
          model: "User",
          key: "id",
        },
      },
      isLike: DataTypes.INTEGER,
    },
    {}
  );
  Like.associate = function (models) {
    models.User.belongsToMany(models.Message, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'message_id',
    });

   models.Message.belongsToMany(models.User, {
    through: models.Like,
   foreignKey: 'messageId',
   otherKey: 'userId',
  });

    models.Like.belongsTo(models.User, {
      foreignKey: "userId",
      defaultValue: "gren",
     as: "user",
    });

    models.Like.belongsTo(models.Message, {
      foreignKey: 'messageId',
      as: 'message',
    });
  };
  return Like;
};