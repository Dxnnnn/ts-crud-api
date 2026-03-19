import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface RequestAttributes  {
    id: number;
    employeeId: string;
    requestType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RequestCreationAttributes
extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Request
extends Model<RequestAttributes, RequestCreationAttributes>
implements RequestAttributes {
    public id!: number;
    public employeeId!: string;
    public requestType!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db:any) {
        db.Request.belongsTo(db.User, { foreignKey: 'UserID', as: 'user '});
      
    }
}

export default function (sequelize: Sequelize): typeof Request {
    Request.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            employeeId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            requestType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'pending'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        },
        {
            sequelize,
            modelName: 'Request',
            tableName: 'requests',
            timestamps: true,
        }
    );

    return Request;
}