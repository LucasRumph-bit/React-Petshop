const { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

const errorHandler = (error, _req, res, _next) => {
  if (error.name === 'ApiError') {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }

  if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
    return res.status(422).json({
      success: false,
      message: 'Falha de validacao.',
      errors: error.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
    });
  }

  if (error instanceof ForeignKeyConstraintError) {
    return res.status(409).json({
      success: false,
      message: 'Nao foi possivel concluir a operacao por causa de um relacionamento existente.',
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
  });
};

module.exports = errorHandler;
