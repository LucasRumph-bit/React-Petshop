const petService = require('../services/PetService');
const { sendSuccess } = require('../utils/apiResponse');

class PetController {
  async list(req, res) {
    const pets = await petService.list(req.query);
    return sendSuccess(res, { message: 'Pets listados com sucesso.', data: pets });
  }

  async getById(req, res) {
    const pet = await petService.getById(req.params.id);
    return sendSuccess(res, { message: 'Pet encontrado com sucesso.', data: pet });
  }

  async create(req, res) {
    const pet = await petService.create(req.body);
    return sendSuccess(res, { statusCode: 201, message: 'Pet criado com sucesso.', data: pet });
  }

  async update(req, res) {
    const pet = await petService.update(req.params.id, req.body);
    return sendSuccess(res, { message: 'Pet atualizado com sucesso.', data: pet });
  }

  async delete(req, res) {
    await petService.delete(req.params.id);
    return sendSuccess(res, { message: 'Pet removido com sucesso.' });
  }
}

module.exports = new PetController();
