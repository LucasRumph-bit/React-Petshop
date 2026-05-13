const authService = require('../services/AuthService');
const { sendSuccess } = require('../utils/apiResponse');

class AuthController {
  async register(req, res) {
    const result = await authService.register(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Usuario registrado com sucesso.',
      data: result,
    });
  }

  async login(req, res) {
    const result = await authService.login(req.body);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Login realizado com sucesso.',
      data: result,
    });
  }

  async me(req, res) {
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Usuario autenticado.',
      data: req.user,
    });
  }
}

module.exports = new AuthController();
