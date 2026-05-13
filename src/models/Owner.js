const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Owner extends Model {}

Owner.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    document: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Owner',
    tableName: 'owners',
  }
);

module.exports = Owner;
