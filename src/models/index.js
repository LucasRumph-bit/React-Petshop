const sequelize = require('../config/database');
const User = require('./User');
const Owner = require('./Owner');
const Pet = require('./Pet');
const ServiceType = require('./ServiceType');
const ServiceRecord = require('./ServiceRecord');

const initModels = () => {
  Owner.hasMany(Pet, {
    as: 'pets',
    foreignKey: 'ownerId',
  });

  Pet.belongsTo(Owner, {
    as: 'owner',
    foreignKey: 'ownerId',
  });

  Pet.hasMany(ServiceRecord, {
    as: 'services',
    foreignKey: 'petId',
  });

  ServiceRecord.belongsTo(Pet, {
    as: 'pet',
    foreignKey: 'petId',
  });

  ServiceType.hasMany(ServiceRecord, {
    as: 'serviceRecords',
    foreignKey: 'serviceTypeId',
  });

  ServiceRecord.belongsTo(ServiceType, {
    as: 'serviceType',
    foreignKey: 'serviceTypeId',
  });

  return sequelize;
};

module.exports = {
  sequelize,
  User,
  Owner,
  Pet,
  ServiceType,
  ServiceRecord,
  initModels,
};
