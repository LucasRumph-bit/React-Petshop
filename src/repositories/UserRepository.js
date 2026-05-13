const BaseRepository = require('./BaseRepository');
const { User } = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  findPublicById(id) {
    return this.findById(id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });
  }

  findAllPublic() {
    return this.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
      order: [['id', 'ASC']],
    });
  }
}

module.exports = new UserRepository();
