"use strict";

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("auth", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    activeCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING,
      unique: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });
};