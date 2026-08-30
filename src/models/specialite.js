const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./category");

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
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "categories", key: "id" },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Specialite",
    tableName: "specialites",
    timestamps: false,
  }
);

Specialite.belongsTo(Category, { foreignKey: "categorie_id", as: "categorie" });
Category.hasMany(Specialite, { foreignKey: "categorie_id", as: "specialites" });

module.exports = Specialite;
