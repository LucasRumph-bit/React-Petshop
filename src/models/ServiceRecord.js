const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class ServiceRecord extends Model {}

ServiceRecord.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'pet_id',
    },
    serviceTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'service_type_id',
    },
    serviceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'service_date',
    },
    chargedAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'charged_amount',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'canceled'),
      allowNull: false,
      defaultValue: 'scheduled',
    },
  },
  {
    sequelize,
    modelName: 'ServiceRecord',
    tableName: 'service_records',
  }
);

module.exports = ServiceRecord;
