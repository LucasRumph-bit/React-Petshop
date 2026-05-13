const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const { ServiceRecord, Pet, Owner, ServiceType } = require('../models');

class ServiceRecordRepository extends BaseRepository {
  constructor() {
    super(ServiceRecord);
  }

  findAllWithFilters(filters = {}) {
    const where = {};

    if (filters.petId) {
      where.petId = filters.petId;
    }

    if (filters.serviceTypeId) {
      where.serviceTypeId = filters.serviceTypeId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.fromDate || filters.toDate) {
      where.serviceDate = {};

      if (filters.fromDate) {
        where.serviceDate[Op.gte] = new Date(filters.fromDate);
      }

      if (filters.toDate) {
        where.serviceDate[Op.lte] = new Date(filters.toDate);
      }
    }

    return this.findAll({
      where,
      include: [
        {
          model: Pet,
          as: 'pet',
          include: [{ model: Owner, as: 'owner' }],
        },
        {
          model: ServiceType,
          as: 'serviceType',
        },
      ],
      order: [['serviceDate', 'DESC']],
    });
  }

  findDetailedById(id) {
    return this.findById(id, {
      include: [
        {
          model: Pet,
          as: 'pet',
          include: [{ model: Owner, as: 'owner' }],
        },
        {
          model: ServiceType,
          as: 'serviceType',
        },
      ],
    });
  }
}

module.exports = new ServiceRecordRepository();
