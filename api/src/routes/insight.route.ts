import { Router } from "express";
import { getInsightsByCompanySymbol } from "../controllers/insight.controller";

const insightRouter = Router();

insightRouter.get("/:symbol", getInsightsByCompanySymbol);

export default insightRouter;
