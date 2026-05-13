const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { generateAccessToken } = require('../utils/jwt');
const userRepository = require('../repositories/UserRepository');

class AuthService {
  async register(payload) {
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ApiError(409, 'Ja existe um usuario com este email.');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await userRepository.create({
      name: payload.name,
      email: payload.email,
      passwordHash,
      role: 'attendant',
    });

    const publicUser = await userRepository.findPublicById(user.id);

    return {
      user: publicUser,
      token: generateAccessToken(user),
    };
  }

  async login(payload) {
    const user = await userRepository.findByEmail(payload.email);

    if (!user) {
      throw new ApiError(401, 'Credenciais invalidas.');
    }

    const passwordMatches = await bcrypt.compare(payload.password, user.passwordHash);

    if (!passwordMatches) {
      throw new ApiError(401, 'Credenciais invalidas.');
    }

    const publicUser = await userRepository.findPublicById(user.id);

    return {
      user: publicUser,
      token: generateAccessToken(user),
    };
  }
}

module.exports = new AuthService();
