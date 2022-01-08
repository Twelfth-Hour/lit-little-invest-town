import {
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import { IncomeStatementDAO } from "../dao/income_statement.dao";
import sequelize from "../db";
import Company from "./company.model";

interface IncomeStatementAttributes {
  id: number;
  year: number;
  total_revenue: number;
  raw_material_cost: number;
  power_cost: number;
  employee_cost: number;
  administrative_cost: number;
  operating_cost: number;
  pbt: number;
  net_income: number;
}

type IncomeStatementCreationAttributes = Optional<
  IncomeStatementAttributes,
  "id"
>;

class IncomeStatement
  extends Model<IncomeStatementAttributes, IncomeStatementCreationAttributes>
  implements IncomeStatementAttributes
{
  public id!: number;
  public year!: number;
  public total_revenue!: number;
  public raw_material_cost!: number;
  public power_cost!: number;
  public employee_cost!: number;
  public administrative_cost!: number;
  public operating_cost!: number;
  public pbt!: number;
  public net_income!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCompany!: HasOneGetAssociationMixin<Company>;
  public setCompany!: HasOneSetAssociationMixin<Company, number>;

  public toDAO(): IncomeStatementDAO {
    return {
      year: this.year,
      total_revenue: this.total_revenue,
      raw_material_cost: this.raw_material_cost,
      power_cost: this.power_cost,
      employee_cost: this.employee_cost,
      administrative_cost: this.administrative_cost,
      operating_cost: this.operating_cost,
      pbt: this.pbt,
      net_income: this.net_income,
    };
  }
}

IncomeStatement.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    total_revenue: {
      type: DataTypes.DOUBLE,
    },
    raw_material_cost: {
      type: DataTypes.DOUBLE,
    },
    power_cost: {
      type: DataTypes.DOUBLE,
    },
    employee_cost: {
      type: DataTypes.DOUBLE,
    },
    administrative_cost: {
      type: DataTypes.DOUBLE,
    },
    operating_cost: {
      type: DataTypes.DOUBLE,
    },
    pbt: {
      type: DataTypes.DOUBLE,
    },
    net_income: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    modelName: "income_statement",
  }
);

export default IncomeStatement;
