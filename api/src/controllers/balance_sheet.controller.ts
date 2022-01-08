import { RequestHandler, Request, Response } from "express";
import { getBalanceSheetByCompanySymbolService } from "../services/balance_sheet.service";

export const getBalanceSheetByCompanySymbol: RequestHandler<{
  symbol: string;
}> = async (req: Request<{ symbol: string }>, res: Response) => {
  const balanceSheets = await getBalanceSheetByCompanySymbolService(
    req.params.symbol
  );
  res
    .status(200)
    .send(balanceSheets.map((balanceSheet) => balanceSheet.toDAO()));
};
