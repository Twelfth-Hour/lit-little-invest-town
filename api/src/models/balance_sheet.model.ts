import {
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  // HasOneGetAssociationMixin,
  // HasOneSetAssociationMixin,
  Model,
  Optional,
} from "sequelize";
import sequelize from "../db";
import Company from "./company.model";

interface BalanceSheetAttributes {
  id: number;
  year: number;
  current_assets: number;
  cash: number;
  receivables: number;
  inventory: number;
  non_current_assets: number;
  loan: number;
  equipment: number;
  goodwill: number;
  long_term_investment: number;
  total_assets: number;
  long_term_debts: number;
}

type BalanceSheetCreationAttributes = Optional<BalanceSheetAttributes, "id">;

class BalanceSheet
  extends Model<BalanceSheetAttributes, BalanceSheetCreationAttributes>
  implements BalanceSheetAttributes
{
  public id!: number;
  public year!: number;
  public current_assets!: number;
  public cash!: number;
  public receivables!: number;
  public inventory!: number;
  public non_current_assets!: number;
  public loan!: number;
  public equipment!: number;
  public goodwill!: number;
  public long_term_investment!: number;
  public total_assets!: number;
  public long_term_debts!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCompany!: HasOneGetAssociationMixin<Company>;
  public setCompany!: HasOneSetAssociationMixin<Company, number>;
}

BalanceSheet.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    current_assets: {
      type: DataTypes.DOUBLE,
    },
    cash: {
      type: DataTypes.DOUBLE,
    },
    receivables: {
      type: DataTypes.DOUBLE,
    },
    inventory: {
      type: DataTypes.DOUBLE,
    },
    non_current_assets: {
      type: DataTypes.DOUBLE,
    },
    loan: {
      type: DataTypes.DOUBLE,
    },
    equipment: {
      type: DataTypes.DOUBLE,
    },
    goodwill: {
      type: DataTypes.DOUBLE,
    },
    long_term_investment: {
      type: DataTypes.DOUBLE,
    },
    total_assets: {
      type: DataTypes.DOUBLE,
    },
    long_term_debts: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize,
    modelName: "balance_sheet",
  }
);

export default BalanceSheet;
