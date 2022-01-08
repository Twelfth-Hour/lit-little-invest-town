import { Router } from "express";
import {
  getAllCompanies,
  getSimilarCompanies,
} from "../controllers/company.controller";

const companyRouter = Router();

companyRouter.get("/similar/:symbol", getSimilarCompanies);

companyRouter.get("/", getAllCompanies);

export default companyRouter;
