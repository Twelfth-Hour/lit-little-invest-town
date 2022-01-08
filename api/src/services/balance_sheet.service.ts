import BalanceSheet from "../models/balance_sheet.model";
import Company from "../models/company.model";

export const getBalanceSheetByCompanySymbolService = async (
  symbol: string
): Promise<BalanceSheet[]> => {
  return await BalanceSheet.findAll({
    include: {
      model: Company,
      where: { symbol },
    },
  });
};
