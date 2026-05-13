const serviceTypeService = require('../services/ServiceTypeService');
const { sendSuccess } = require('../utils/apiResponse');

class ServiceTypeController {
  async list(req, res) {
    const serviceTypes = await serviceTypeService.list(req.query);
    return sendSuccess(res, { message: 'Tipos de servico listados com sucesso.', data: serviceTypes });
  }

  async getById(req, res) {
    const serviceType = await serviceTypeService.getById(req.params.id);
    return sendSuccess(res, { message: 'Tipo de servico encontrado com sucesso.', data: serviceType });
  }

  async create(req, res) {
    const serviceType = await serviceTypeService.create(req.body);
    return sendSuccess(res, { statusCode: 201, message: 'Tipo de servico criado com sucesso.', data: serviceType });
  }

  async update(req, res) {
    const serviceType = await serviceTypeService.update(req.params.id, req.body);
    return sendSuccess(res, { message: 'Tipo de servico atualizado com sucesso.', data: serviceType });
  }

  async delete(req, res) {
    await serviceTypeService.delete(req.params.id);
    return sendSuccess(res, { message: 'Tipo de servico removido com sucesso.' });
  }
}

module.exports = new ServiceTypeController();
