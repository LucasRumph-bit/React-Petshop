const ApiError = require('../utils/ApiError');
const serviceTypeRepository = require('../repositories/ServiceTypeRepository');
const serviceRecordRepository = require('../repositories/ServiceRecordRepository');

class ServiceTypeService {
  list(filters) {
    return serviceTypeRepository.findAllWithFilters(filters);
  }

  async getById(id) {
    const serviceType = await serviceTypeRepository.findById(id);

    if (!serviceType) {
      throw new ApiError(404, 'Tipo de servico nao encontrado.');
    }

    return serviceType;
  }

  create(payload) {
    return serviceTypeRepository.create(payload);
  }

  async update(id, payload) {
    const serviceType = await serviceTypeRepository.findById(id);

    if (!serviceType) {
      throw new ApiError(404, 'Tipo de servico nao encontrado.');
    }

    await serviceTypeRepository.update(serviceType, payload);
    return this.getById(id);
  }

  async delete(id) {
    const serviceType = await serviceTypeRepository.findById(id);

    if (!serviceType) {
      throw new ApiError(404, 'Tipo de servico nao encontrado.');
    }

    const servicesCount = await serviceRecordRepository.count({ where: { serviceTypeId: id } });
    if (servicesCount > 0) {
      throw new ApiError(409, 'Nao e possivel excluir tipo de servico com atendimentos vinculados.');
    }

    await serviceTypeRepository.destroy(serviceType);
  }
}

module.exports = new ServiceTypeService();
