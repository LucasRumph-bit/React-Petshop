const ApiError = require('../utils/ApiError');
const ownerRepository = require('../repositories/OwnerRepository');
const petRepository = require('../repositories/PetRepository');

class OwnerService {
  list(filters) {
    return ownerRepository.findAllWithFilters(filters);
  }

  async getById(id) {
    const owner = await ownerRepository.findDetailedById(id);

    if (!owner) {
      throw new ApiError(404, 'Dono nao encontrado.');
    }

    return owner;
  }

  create(payload) {
    return ownerRepository.create(payload);
  }

  async update(id, payload) {
    const owner = await ownerRepository.findById(id);

    if (!owner) {
      throw new ApiError(404, 'Dono nao encontrado.');
    }

    await ownerRepository.update(owner, payload);
    return this.getById(id);
  }

  async delete(id) {
    const owner = await ownerRepository.findById(id);

    if (!owner) {
      throw new ApiError(404, 'Dono nao encontrado.');
    }

    const petsCount = await petRepository.count({ where: { ownerId: id } });
    if (petsCount > 0) {
      throw new ApiError(409, 'Nao e possivel excluir dono com pets vinculados.');
    }

    await ownerRepository.destroy(owner);
  }
}

module.exports = new OwnerService();
