import { RequestHandler, Request, Response } from "express";
import { getIncomeStatementByCompanySymbolService } from "../services/income_statement.service";

export const getIncomeStatementByCompanySymbol: RequestHandler<{
  symbol: string;
}> = async (req: Request<{ symbol: string }>, res: Response) => {
  const incomeStatements = await getIncomeStatementByCompanySymbolService(
    req.params.symbol
  );
  res
    .status(200)
    .send(incomeStatements.map((incomeStatement) => incomeStatement.toDAO()));
};
