const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = require("./category");
const Ville = require("./ville");
const Departement = require("./departement");
const Specialite = require("./specialite");

class Artisan extends Model {}

Artisan.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: { type: DataTypes.STRING(150), allowNull: false },
    note: { type: DataTypes.FLOAT, defaultValue: 0, validate: { min: 0, max: 5 } },
    image: { type: DataTypes.STRING(255), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true, validate: { isEmail: true } },
    site_web: { type: DataTypes.STRING(255), allowNull: true, validate: { isUrl: true } },
    a_propos: { type: DataTypes.TEXT, allowNull: true },
    top: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Clés étrangères
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Category, key: "id" },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    specialite_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Specialite, key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    ville_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Ville, key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    departement_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Departement, key: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Artisan",
    tableName: "artisans",
    timestamps: false,
  }
);

/**
 * Associations
 */
Artisan.belongsTo(Category, { foreignKey: "categorie_id", as: "categorie" });
Artisan.belongsTo(Specialite, { foreignKey: "specialite_id", as: "specialite" });
Artisan.belongsTo(Ville, { foreignKey: "ville_id", as: "ville" });
Artisan.belongsTo(Departement, { foreignKey: "departement_id", as: "departement" });

module.exports = Artisan;
