class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(payload, options = {}) {
    return this.model.create(payload, options);
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  findOne(options = {}) {
    return this.model.findOne(options);
  }

  findAll(options = {}) {
    return this.model.findAll(options);
  }

  update(instance, payload) {
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined)
    );

    return instance.update(cleanPayload);
  }

  destroy(instance) {
    return instance.destroy();
  }

  count(options = {}) {
    return this.model.count(options);
  }
}

module.exports = BaseRepository;
