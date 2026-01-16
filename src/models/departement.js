const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Departement extends Model {}

Departement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "departement",
    tableName: "departements",
    timestamps: false,
  }
);

module.exports = Departement;
