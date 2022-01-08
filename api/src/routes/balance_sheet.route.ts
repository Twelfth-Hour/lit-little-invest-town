import { Router } from "express";
import { getBalanceSheetByCompanySymbol } from "../controllers/balance_sheet.controller";

const balanceSheetRouter = Router();

balanceSheetRouter.get("/:symbol", getBalanceSheetByCompanySymbol);

export default balanceSheetRouter;
