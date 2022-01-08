import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  // HasOneGetAssociationMixin,
  // HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import { CompanyDAO } from "../dao/company.dao";
import sequelize from "../db";
import BalanceSheet from "./balance_sheet.model";
import IncomeStatement from "./income_statement.model";

interface CompanyAttributes {
  id: number;
  name: string;
  symbol: string;
  url: string;
  sector: string;
  sub_sector: string;
  market_cap: number;
  risk: string;
}

type CompanyCreationAttributes = Optional<CompanyAttributes, "id">;

class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public symbol!: string;
  public url!: string;
  public sector!: string;
  public sub_sector!: string;
  public market_cap!: number;
  public risk!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getBalanceSheets!: HasManyGetAssociationsMixin<BalanceSheet>;
  public addBalanceSheet!: HasManyAddAssociationMixin<BalanceSheet, number>;

  public getIncomeStatements!: HasManyGetAssociationsMixin<IncomeStatement>;
  public addIncomeStatement!: HasManyAddAssociationMixin<
    IncomeStatement,
    number
  >;

  public toDAO(): CompanyDAO {
    return {
      name: this.name,
      symbol: this.symbol,
      url: this.url,
      sector: this.sector,
      sub_sector: this.sub_sector,
      market_cap: this.market_cap,
      risk: this.risk,
    };
  }
}

Company.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    sector: {
      type: DataTypes.STRING,
    },
    sub_sector: {
      type: DataTypes.STRING,
    },
    market_cap: {
      type: DataTypes.BIGINT,
    },
    risk: {
      type: DataTypes.ENUM("low", "moderate", "high"),
    },
  },
  {
    sequelize,
    modelName: "company",
  }
);

Company.hasMany(BalanceSheet);
BalanceSheet.belongsTo(Company);

Company.hasMany(IncomeStatement);
IncomeStatement.belongsTo(Company);

export default Company;
