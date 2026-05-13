const { Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const { Owner, Pet } = require('../models');

class OwnerRepository extends BaseRepository {
  constructor() {
    super(Owner);
  }

  findAllWithFilters(filters = {}) {
    const where = {};

    if (filters.name) {
      where.name = { [Op.like]: `%${filters.name}%` };
    }

    if (filters.document) {
      where.document = { [Op.like]: `%${filters.document}%` };
    }

    if (filters.email) {
      where.email = { [Op.like]: `%${filters.email}%` };
    }

    return this.findAll({
      where,
      order: [['id', 'ASC']],
    });
  }

  findDetailedById(id) {
    return this.findById(id, {
      include: [
        {
          model: Pet,
          as: 'pets',
        },
      ],
    });
  }
}

module.exports = new OwnerRepository();
