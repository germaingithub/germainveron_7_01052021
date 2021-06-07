"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./message")(sequelize, Sequelize);
db.comments = require("./Comments")(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  defaultValue: "gren",
});

db.user.hasMany(db.comments);

db.comments.belongsTo(db.user, {
  foreignKey: "Users_Id",
});
db.post.hasMany(db.comments);

db.comments.belongsTo(db.post, {
  foreignKey: "Message_id",
});

module.exports = db;
