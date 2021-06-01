'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comments.belongsTo(models.User, {
        foreignKey: "userId",
      });

      models.Comments.belongsTo(models.Message, {
        foreignKey:'Message_id'
      });
    }
  };
  Comments.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    Message_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};