const axios = require('axios');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');

class CepLookupService {
  async findByCep(cep) {
    const sanitizedCep = String(cep).replace(/\D/g, '');

    if (sanitizedCep.length !== 8) {
      throw new ApiError(422, 'CEP invalido. Informe um CEP com 8 digitos.');
    }

    const { data } = await axios.get(`${env.integrations.cepApiBaseUrl}/${sanitizedCep}/json/`, {
      timeout: 5000,
    });

    if (data.erro) {
      throw new ApiError(404, 'CEP nao encontrado.');
    }

    return data;
  }
}

module.exports = new CepLookupService();
