'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const passwordHash = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Administrador',
        email: 'admin@petshop.local',
        password_hash: passwordHash,
        role: 'admin',
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@petshop.local' });
  },
};
