import Company from "../models/company.model";
import IncomeStatement from "../models/income_statement.model";

export const getIncomeStatementByCompanySymbolService = async (
  symbol: string
): Promise<IncomeStatement[]> => {
  return await IncomeStatement.findAll({
    include: {
      model: Company,
      where: { symbol },
    },
  });
};
