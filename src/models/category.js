
// models/category.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "Category",
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

    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9-]+$/i, // slug propre
      },
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
