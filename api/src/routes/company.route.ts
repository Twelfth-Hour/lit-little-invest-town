import { Router } from "express";
import { getAllCompanies } from "../controllers/company.controller";

const companyRouter = Router();

companyRouter.get("/", getAllCompanies);

export default companyRouter;
