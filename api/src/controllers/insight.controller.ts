import { RequestHandler, Request, Response } from "express";
import { getBalanceSheetByCompanySymbolService } from "../services/balance_sheet.service";
import { getIncomeStatementByCompanySymbolService } from "../services/income_statement.service";
import {
  getCashInsightsService,
  getEmployeeInsightsService,
  getLoanInsightsService,
  getMutualFundInsightsService,
  getPowerInsightsService,
  getProfitInsightsService,
  getRawMaterialsInsightsService,
  getRevenueInsightsService,
} from "../services/insight.service";

export const getInsightsByCompanySymbol: RequestHandler<{
  symbol: string;
}> = async (req: Request<{ symbol: string }>, res: Response) => {
  const incomeStatements = await getIncomeStatementByCompanySymbolService(
    req.params.symbol
  );
  const balanceStatements = await getBalanceSheetByCompanySymbolService(
    req.params.symbol
  );
  if (incomeStatements.length != 4 || balanceStatements.length != 4) {
    res.status(404).send("Company not found");
    return;
  }

  const revenues = incomeStatements.map(
    (incomeStatement) => incomeStatement.total_revenue
  );
  const profits = incomeStatements.map(
    (incomeStatement) => incomeStatement.net_income
  );
  const cash = incomeStatements.map(
    (incomeStatement) => incomeStatement.net_income
  );
  const loans = balanceStatements.map(
    (balanceSheet) => balanceSheet.long_term_debts
  );
  const insights: string[] = [];

  insights.push(getRevenueInsightsService(revenues));
  insights.push(
    getRawMaterialsInsightsService(incomeStatements[3].raw_material_cost)
  );
  insights.push(getPowerInsightsService(incomeStatements[3].power_cost));
  insights.push(getEmployeeInsightsService(incomeStatements[3].employee_cost));
  insights.push(getProfitInsightsService(profits));
  insights.push(getCashInsightsService(cash));
  insights.push(
    getMutualFundInsightsService(balanceStatements[3].long_term_investment)
  );
  insights.push(getLoanInsightsService(loans));

  res.status(200).send(insights);
};
