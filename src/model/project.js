module.exports = function(sequelize, DataTypes) {
  return sequelize.define("project", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  },{
    freezeTableName: true
  })
}
