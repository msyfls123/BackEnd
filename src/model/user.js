module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    }
  },{
    freezeTableName: true
  })
}
