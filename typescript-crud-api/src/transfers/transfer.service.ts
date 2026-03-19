import { db } from '../_helpers/db';
import { Transfer, TransferCreationAttributes } from './transfer.model';

export const transferService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<Transfer[]> {
    return await db.Transfer.findAll({
        include: [
            { model: db.Employee, attributes: ['id'], include: [{ model: db.User, attributes: ['email'] }] },
            { model: db.Department, as: 'fromDepartment', attributes: ['name'] },
            { model: db.Department, as: 'toDepartment', attributes: ['name'] }
        ]
    });
}

async function getById(id: number): Promise<Transfer> {
    return await getTransfer(id);
}

async function create(params: TransferCreationAttributes): Promise<void> {
    // Create Transfer
    await db.Transfer.create(params as TransferCreationAttributes); 
}

async function update(id: number, params: Partial<TransferCreationAttributes>): Promise<void> {
    const transfer = await getTransfer(id);
    Object.assign(transfer, params);
    await transfer.save();
}

async function _delete(id: number): Promise<void> {
    const transfer = await getTransfer(id);
    await transfer.destroy();
}

async function getTransfer(id: number): Promise<Transfer> {
    const transfer = await db.Transfer.findByPk(id, {
        include: [
            { model: db.Employee, attributes: ['id'], include: [{ model: db.User, attributes: ['email'] }] },
            { model: db.Department, as: 'fromDepartment', attributes: ['name'] },
            { model: db.Department, as: 'toDepartment', attributes: ['name'] }
        ]
    });
    if (!transfer) {
        throw new Error('Transfer not found');
    }
    return transfer;
}