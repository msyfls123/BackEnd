module.exports = function(sequelize, DataTypes) {
  return sequelize.define("auth", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    active:{
      type: DataTypes.BOOLEAN
    },
    uuid:{
      type: DataTypes.STRING,
      unique: true
    }
  },{
    freezeTableName: true
  })
}
