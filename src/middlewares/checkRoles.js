import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';

export const checkUserRole = () => (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createHttpError(401, 'Not authenticated'));
    return;
  }

  const { role } = user;
  if (role === ROLES.USER) {
    next();
    return;
  }

  next(createHttpError(403, 'Forbidden: USER role required'));
};
