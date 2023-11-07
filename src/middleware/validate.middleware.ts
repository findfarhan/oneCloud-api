import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware(
    dtoClass: new () => any, 
    skipMissingProperties = false,
    whitelist = false
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const merged = Object.assign({}, req.body);

    const dto = plainToClass(dtoClass, merged);

    validate(dto, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    })
      .then((errors) => {
        if (errors.length > 0) {
          const validationErrors = errors.map((error) =>
            Object.values(error.constraints)
          );
          return res.status(400).json({ message: 'Validation error', errors: validationErrors });
        } else {
          next();
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}
