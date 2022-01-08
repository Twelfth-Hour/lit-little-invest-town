import { Router } from "express";
import {
  getAllCompanies,
  getCompanyBySymbol,
  getSimilarCompanies,
} from "../controllers/company.controller";

const companyRouter = Router();

companyRouter.get("/similar/:symbol", getSimilarCompanies);

companyRouter.get("/:symbol", getCompanyBySymbol);

companyRouter.get("/", getAllCompanies);

export default companyRouter;
