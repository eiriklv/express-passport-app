"use strict"

var Sequelize = require('sequelize');

var database = "express_passport_app",
    username = "postgres",
    password = "";

var sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.Sequelize = Sequelize;

module.exports = sequelize;