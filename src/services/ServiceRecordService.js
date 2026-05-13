const ApiError = require('../utils/ApiError');
const petRepository = require('../repositories/PetRepository');
const serviceTypeRepository = require('../repositories/ServiceTypeRepository');
const serviceRecordRepository = require('../repositories/ServiceRecordRepository');

class ServiceRecordService {
  list(filters) {
    return serviceRecordRepository.findAllWithFilters(filters);
  }

  async getById(id) {
    const record = await serviceRecordRepository.findDetailedById(id);

    if (!record) {
      throw new ApiError(404, 'Servico realizado nao encontrado.');
    }

    return record;
  }

  async create(payload) {
    const pet = await petRepository.findById(payload.petId);
    if (!pet) {
      throw new ApiError(404, 'Pet informado nao encontrado.');
    }

    const serviceType = await serviceTypeRepository.findById(payload.serviceTypeId);
    if (!serviceType) {
      throw new ApiError(404, 'Tipo de servico informado nao encontrado.');
    }

    return serviceRecordRepository.create(payload);
  }

  async update(id, payload) {
    const record = await serviceRecordRepository.findById(id);

    if (!record) {
      throw new ApiError(404, 'Servico realizado nao encontrado.');
    }

    if (payload.petId) {
      const pet = await petRepository.findById(payload.petId);
      if (!pet) {
        throw new ApiError(404, 'Pet informado nao encontrado.');
      }
    }

    if (payload.serviceTypeId) {
      const serviceType = await serviceTypeRepository.findById(payload.serviceTypeId);
      if (!serviceType) {
        throw new ApiError(404, 'Tipo de servico informado nao encontrado.');
      }
    }

    await serviceRecordRepository.update(record, payload);
    return this.getById(id);
  }

  async delete(id) {
    const record = await serviceRecordRepository.findById(id);

    if (!record) {
      throw new ApiError(404, 'Servico realizado nao encontrado.');
    }

    await serviceRecordRepository.destroy(record);
  }
}

module.exports = new ServiceRecordService();
