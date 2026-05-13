const ownerService = require('../services/OwnerService');
const { sendSuccess } = require('../utils/apiResponse');

class OwnerController {
  async list(req, res) {
    const owners = await ownerService.list(req.query);
    return sendSuccess(res, { message: 'Donos listados com sucesso.', data: owners });
  }

  async getById(req, res) {
    const owner = await ownerService.getById(req.params.id);
    return sendSuccess(res, { message: 'Dono encontrado com sucesso.', data: owner });
  }

  async create(req, res) {
    const owner = await ownerService.create(req.body);
    return sendSuccess(res, { statusCode: 201, message: 'Dono criado com sucesso.', data: owner });
  }

  async update(req, res) {
    const owner = await ownerService.update(req.params.id, req.body);
    return sendSuccess(res, { message: 'Dono atualizado com sucesso.', data: owner });
  }

  async delete(req, res) {
    await ownerService.delete(req.params.id);
    return sendSuccess(res, { message: 'Dono removido com sucesso.' });
  }
}

module.exports = new OwnerController();
