const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Departement = require("./departement");

class Ville extends Model {}

Ville.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    departement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departement,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Ville",
    tableName: "villes",
    timestamps: false,
  }
);

// Association : une ville appartient à un département
Ville.belongsTo(Departement, { foreignKey: "departement_id", as: "departement" });

module.exports = Ville;
