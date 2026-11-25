import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';

export const authorize = (allowedRoles: Array<'admin' | 'staff'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in first.',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden. Role '${req.user.role}' lacks permission for this action.`,
      });
      return;
    }

    next();
  };
};
