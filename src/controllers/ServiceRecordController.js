const serviceRecordService = require('../services/ServiceRecordService');
const { sendSuccess } = require('../utils/apiResponse');

class ServiceRecordController {
  async list(req, res) {
    const records = await serviceRecordService.list(req.query);
    return sendSuccess(res, { message: 'Servicos realizados listados com sucesso.', data: records });
  }

  async getById(req, res) {
    const record = await serviceRecordService.getById(req.params.id);
    return sendSuccess(res, { message: 'Servico realizado encontrado com sucesso.', data: record });
  }

  async create(req, res) {
    const record = await serviceRecordService.create(req.body);
    return sendSuccess(res, { statusCode: 201, message: 'Servico realizado criado com sucesso.', data: record });
  }

  async update(req, res) {
    const record = await serviceRecordService.update(req.params.id, req.body);
    return sendSuccess(res, { message: 'Servico realizado atualizado com sucesso.', data: record });
  }

  async delete(req, res) {
    await serviceRecordService.delete(req.params.id);
    return sendSuccess(res, { message: 'Servico realizado removido com sucesso.' });
  }
}

module.exports = new ServiceRecordController();
