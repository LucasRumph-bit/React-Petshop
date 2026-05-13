const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class ServiceType extends Model {}

ServiceType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'base_price',
    },
  },
  {
    sequelize,
    modelName: 'ServiceType',
    tableName: 'service_types',
  }
);

module.exports = ServiceType;
