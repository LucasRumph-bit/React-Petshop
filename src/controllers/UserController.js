const userService = require('../services/UserService');
const { sendSuccess } = require('../utils/apiResponse');

class UserController {
  async list(_req, res) {
    const users = await userService.list();
    return sendSuccess(res, { message: 'Usuarios listados com sucesso.', data: users });
  }

  async getById(req, res) {
    const user = await userService.getById(req.params.id);
    return sendSuccess(res, { message: 'Usuario encontrado com sucesso.', data: user });
  }

  async update(req, res) {
    const user = await userService.update(req.params.id, req.body);
    return sendSuccess(res, { message: 'Usuario atualizado com sucesso.', data: user });
  }

  async delete(req, res) {
    await userService.delete(req.params.id);
    return sendSuccess(res, { message: 'Usuario removido com sucesso.' });
  }
}

module.exports = new UserController();
