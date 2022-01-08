import { Router } from "express";
import { getIncomeStatementByCompanySymbol } from "../controllers/income_statement.controller";

const incomeStatementRouter = Router();

incomeStatementRouter.get("/:symbol", getIncomeStatementByCompanySymbol);

export default incomeStatementRouter;
