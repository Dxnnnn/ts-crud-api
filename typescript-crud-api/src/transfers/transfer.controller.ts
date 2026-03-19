import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Joi, { func } from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { transferService } from './transfer.service';

const router = Router();

// ROUTES
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

// ROUTE HANDLERS (typed)
function getAll(req: Request, res: Response, next: NextFunction): void {
    transferService.getAll()
    .then((transfers) => res.json(transfers))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    transferService.getById(Number(req.params.id))
    .then((transfer) => res.json(transfer))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
    transferService.create(req.body)
    .then(() => res.json({ message: 'Transfer created' }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {  
    transferService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'Transfer updated' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    transferService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'Transfer deleted' }))
    .catch(next);
}

// VALIDATION SCHEMAS
function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        employeeId: Joi.number().required(),
        fromDepartmentId: Joi.string().required(),
        toDepartmentId: Joi.string().required(),
        transferDate: Joi.date().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        employeeId: Joi.number().optional(),
        fromDepartmentId: Joi.string().optional(),
        toDepartmentId: Joi.string().optional(),
        transferDate: Joi.date().optional(),
    });
    validateRequest(req, next, schema);
}