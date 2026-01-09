/* const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  slug: { type: String, required: true }
});

module.exports = mongoose.model("Category", categorySchema);
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
