const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const { ServiceType } = require('../models');

class ServiceTypeRepository extends BaseRepository {
  constructor() {
    super(ServiceType);
  }

  findAllWithFilters(filters = {}) {
    const where = {};

    if (filters.name) {
      where.name = { [Op.like]: `%${filters.name}%` };
    }

    return this.findAll({
      where,
      order: [['id', 'ASC']],
    });
  }
}

module.exports = new ServiceTypeRepository();
