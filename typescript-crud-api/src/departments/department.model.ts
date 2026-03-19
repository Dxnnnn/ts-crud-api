import { Association, DataType,DataTypes,Model,Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

// Define the attributes for the Department model
export interface DepartmentAttributes {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define optional attributes for creation
export interface DepartmentCreationAttributes
extends Optional<DepartmentAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Department
extends Model<DepartmentAttributes, DepartmentCreationAttributes>
implements DepartmentAttributes {

    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(db:any) {
        db.Department.hasMany(db.Employee, { foreignKey: 'departmentId', as: 'employees'});

    }
}


export default function (sequelize: Sequelize): typeof Department {
    Department.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Department',
            tableName: 'departments',
            timestamps: true,
        }
    );

    return Department;
}