'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.User, {
        foreignKey: 'Users_id'
        
      })
      models.Comments.belongsTo (models.Message, {
        foreignKey:'Messages_id'
      })
    }
  };
  Comments.init({
   
    Message_id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};