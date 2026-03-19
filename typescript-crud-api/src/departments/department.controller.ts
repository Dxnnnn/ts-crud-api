import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import { validateRequest } from '../_middleware/validateRequest';
import { departmentService } from './department.service';

const router = Router();

// ROUTES
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

export default router;

// ROUTE HANDLERS (typed)
function getAll(req: Request, res: Response): void {
    departmentService.getAll()
    .then((departments) => res.json(departments))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function getById(req: Request, res: Response): void {
    departmentService.getById(Number(req.params.id))
    .then((department) => res.json(department))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function create(req: Request, res: Response): void {
    departmentService.create(req.body)
    .then(() => res.json({ message: 'Department created' }))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function update(req: Request, res: Response): void {
    departmentService.update(Number(req.params.id), req.body)
    .then(() => res.json({ message: 'Department updated' }))
    .catch((err) => res.status(500).json({ message: err.message }));
}

function _delete(req: Request, res: Response): void {
    departmentService.delete(Number(req.params.id))
    .then(() => res.json({ message: 'Department deleted' }))
    .catch((err) => res.status(500).json({ message: err.message }));
}

// VALIDATION SCHEMAS
function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}