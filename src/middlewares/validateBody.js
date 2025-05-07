import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details.reduce((acc, detail) => {
      acc[detail.path.join('.')] = { message: detail.message, code: detail.type };
      return acc;
    }, {});
    next(createHttpError(400, 'Bad Request', { errors }));
  }
};