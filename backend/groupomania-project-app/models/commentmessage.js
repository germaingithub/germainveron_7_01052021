'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.CommentMessage.belongsTo(models.User, {
        foreignKey: "Users_id",
      });
      models.CommentMessage.belongsTo(models.Message, {
        foreignKey: "Messages_id",
      });
    }
  };
  CommentMessage.init({
    idCommentMessage: DataTypes.INTEGER,
    content: DataTypes.STRING,
    Messages_id: DataTypes.INTEGER,
    Users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentMessage',
  });
  return CommentMessage;
};