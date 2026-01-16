// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Artisan = require("./Artisan");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

// Relation avec Artisan
Category.hasMany(Artisan, { foreignKey: "categorie_id", as: "artisans" });

module.exports = Category;
