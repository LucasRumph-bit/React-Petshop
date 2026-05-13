const ApiError = require('../utils/ApiError');
const ownerRepository = require('../repositories/OwnerRepository');
const petRepository = require('../repositories/PetRepository');
const serviceRecordRepository = require('../repositories/ServiceRecordRepository');

class PetService {
  list(filters) {
    return petRepository.findAllWithFilters(filters);
  }

  async getById(id) {
    const pet = await petRepository.findDetailedById(id);

    if (!pet) {
      throw new ApiError(404, 'Pet nao encontrado.');
    }

    return pet;
  }

  async create(payload) {
    const owner = await ownerRepository.findById(payload.ownerId);

    if (!owner) {
      throw new ApiError(404, 'Dono informado nao encontrado.');
    }

    return petRepository.create(payload);
  }

  async update(id, payload) {
    const pet = await petRepository.findById(id);

    if (!pet) {
      throw new ApiError(404, 'Pet nao encontrado.');
    }

    if (payload.ownerId) {
      const owner = await ownerRepository.findById(payload.ownerId);
      if (!owner) {
        throw new ApiError(404, 'Dono informado nao encontrado.');
      }
    }

    await petRepository.update(pet, payload);
    return this.getById(id);
  }

  async delete(id) {
    const pet = await petRepository.findById(id);

    if (!pet) {
      throw new ApiError(404, 'Pet nao encontrado.');
    }

    const servicesCount = await serviceRecordRepository.count({ where: { petId: id } });
    if (servicesCount > 0) {
      throw new ApiError(409, 'Nao e possivel excluir pet com servicos vinculados.');
    }

    await petRepository.destroy(pet);
  }
}

module.exports = new PetService();
