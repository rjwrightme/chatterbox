var fs = require("fs");
var path = require("path");
// var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];


const { Sequelize, DataTypes } = require('sequelize');


// const config = {
//   username: process.env.DB_USERNAME || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'chatterbox',
//   host: process.env.DB_HOSTNAME || 'locahost',
//   port: process.env.DB_PORT || 3306,
// };
const db = {};
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   port: config.port,
//   dialect: 'mysql',
// });

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(function (file) {
//     return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
//   })
//   .forEach(function (file) {
//     var model = sequelize["import"](path.join(__dirname, file));
//     db[model.name] = model;
//   });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
