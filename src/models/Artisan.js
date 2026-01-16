const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = require("./category");
const Ville = require("./ville");
const Specialite = require("./specialite");

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

    note: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: { min: 0, max: 5 },
    },

    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: { isEmail: true },
    },

    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isUrl: true },
    },

    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    /* =====================
       CLÉS ÉTRANGÈRES
    ===================== */

    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },

    specialite_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "specialites",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },

    ville_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "villes",
        key: "id",
      },
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

/* =====================
   ASSOCIATIONS
===================== */

Artisan.belongsTo(Category, {
  foreignKey: "categorie_id",
  as: "categorie",
});

Artisan.belongsTo(Specialite, {
  foreignKey: "specialite_id",
  as: "specialite_obj",
});

Artisan.belongsTo(Ville, {
  foreignKey: "ville_id",
  as: "ville_obj",
});

module.exports = Artisan;
