const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Category extends Model {}

Category.init(
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
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
