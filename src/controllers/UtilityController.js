const cepLookupService = require('../services/CepLookupService');
const { sendSuccess } = require('../utils/apiResponse');

class UtilityController {
  async lookupCep(req, res) {
    const cepInfo = await cepLookupService.findByCep(req.params.cep);
    return sendSuccess(res, {
      message: 'Consulta de CEP realizada com sucesso.',
      data: cepInfo,
    });
  }
}

module.exports = new UtilityController();
