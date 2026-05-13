const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const userRepository = require('../repositories/UserRepository');

class UserService {
  async list() {
    return userRepository.findAllPublic();
  }

  async getById(id) {
    const user = await userRepository.findPublicById(id);

    if (!user) {
      throw new ApiError(404, 'Usuario nao encontrado.');
    }

    return user;
  }

  async update(id, payload) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, 'Usuario nao encontrado.');
    }

    if (payload.email && payload.email !== user.email) {
      const existingUser = await userRepository.findByEmail(payload.email);
      if (existingUser) {
        throw new ApiError(409, 'Ja existe um usuario com este email.');
      }
    }

    const updateData = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    if (payload.password) {
      updateData.passwordHash = await bcrypt.hash(payload.password, 10);
    }

    await userRepository.update(user, updateData);
    return this.getById(id);
  }

  async delete(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError(404, 'Usuario nao encontrado.');
    }

    await userRepository.destroy(user);
  }
}

module.exports = new UserService();
