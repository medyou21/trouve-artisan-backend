const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");


const Artisan = sequelize.define(
  "Artisan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    specialite: DataTypes.STRING,
    ville: DataTypes.STRING,
    departement: DataTypes.STRING,

    note: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    image: DataTypes.STRING,
    categorie: DataTypes.STRING,

    
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    site_web: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "Artisans",
    timestamps: false,
  }
);

module.exports = Artisan;
