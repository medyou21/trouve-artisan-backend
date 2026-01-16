const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Specialite extends Model {}

Specialite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Specialite",
    tableName: "specialites",
    timestamps: false,
  }
);

module.exports = Specialite;
