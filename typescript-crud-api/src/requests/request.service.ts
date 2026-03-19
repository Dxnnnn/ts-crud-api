import { db } from '../_helpers/db';
import { Request, RequestCreationAttributes } from './request.model';

export const requestService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<Request[]> {
    return await db.Request.findAll();
}

async function getById(id: number): Promise<Request> {
    return await getRequest(id);
}

async function create(params: RequestCreationAttributes): Promise<void> {
    // Create Request
    await db.Request.create(params as RequestCreationAttributes); 
}

async function update(id: number, params: Partial<RequestCreationAttributes>): Promise<void> {
    const request = await getRequest(id);
    await request.update(params as RequestCreationAttributes);
}

async function _delete(id: number): Promise<void> {
    const request = await getRequest(id);
    await request.destroy();
}

async function getRequest(id: number): Promise<Request> {
    const request = await db.Request.findByPk(id);
    if (!request){
         throw new Error('Request not found');
    }
    return request;
}
