'use strict';

const { Op } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('service_types', [
      {
        name: 'Banho',
        description: 'Servico de banho completo para o pet.',
        base_price: 45.00,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Tosa',
        description: 'Tosa higienica ou completa conforme porte do animal.',
        base_price: 60.00,
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Hotel',
        description: 'Hospedagem com acompanhamento da equipe.',
        base_price: 120.00,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('service_types', {
      name: {
        [Op.in]: ['Banho', 'Tosa', 'Hotel'],
      },
    });
  },
};
