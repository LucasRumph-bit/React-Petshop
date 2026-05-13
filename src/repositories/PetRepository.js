const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const { Pet, Owner, ServiceRecord, ServiceType } = require('../models');

class PetRepository extends BaseRepository {
  constructor() {
    super(Pet);
  }

  findAllWithFilters(filters = {}) {
    const where = {};

    if (filters.name) {
      where.name = { [Op.like]: `%${filters.name}%` };
    }

    if (filters.species) {
      where.species = { [Op.like]: `%${filters.species}%` };
    }

    if (filters.ownerId) {
      where.ownerId = filters.ownerId;
    }

    return this.findAll({
      where,
      include: [{ model: Owner, as: 'owner' }],
      order: [['id', 'ASC']],
    });
  }

  findDetailedById(id) {
    return this.findById(id, {
      include: [
        { model: Owner, as: 'owner' },
        {
          model: ServiceRecord,
          as: 'services',
          include: [{ model: ServiceType, as: 'serviceType' }],
        },
      ],
    });
  }
}

module.exports = new PetRepository();
