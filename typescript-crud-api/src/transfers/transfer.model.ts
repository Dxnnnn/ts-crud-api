import { DataTypes, Model, Optional } from "sequelize";
import type { Sequelize } from "sequelize";

export interface TransferAttributes {
    id: number;
    employeeId: number;
    fromDepartmentId: string;
    toDepartmentId: string;
    transferDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransferCreationAttributes
    extends Optional<TransferAttributes, "id" | "createdAt" | "updatedAt"> {}

    export class Transfer 
    extends Model<TransferAttributes, TransferCreationAttributes>
    implements TransferAttributes {
        public id!: number;
        public employeeId!: number;
        public fromDepartmentId!: string;
        public toDepartmentId!: string;
        public transferDate!: Date;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;

        static associate(db: any) {
            db.Transfer.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });

        }
    
    }

    export default function (sequelize: Sequelize): typeof Transfer {
        Transfer.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                employeeId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                fromDepartmentId: {
                    type: DataTypes.STRING,
                    allowNull: false,   
                },
                toDepartmentId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                transferDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }

            },
            {
                sequelize,
                modelName: "Transfer",
                tableName: "transfers",
            }
        );

        return Transfer;
    }