const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('small', 'medium', 'large'),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'owner_id',
    },
  },
  {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
  }
);

module.exports = Pet;
