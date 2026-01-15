// models/artisan.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Artisan extends Model {}

Artisan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    specialite: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    ville: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    departement: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    note: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },

    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    categorie: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },

    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Artisan",
    tableName: "artisans",
    timestamps: false,
  }
);

module.exports = Artisan;
