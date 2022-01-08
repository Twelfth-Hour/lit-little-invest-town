import { RequestHandler, Request, Response } from "express";
import Company from "../models/company.model";
import {
  getAllCompaniesService,
  getCompaniesByRisk,
} from "../services/company.service";

export const getAllCompanies: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const risk = req.query.risk as string;
  const sortBy = req.query.sortBy as string;
  const reverse = req.query.reverse as string;

  let companies: Company[] = [];

  if (["low", "moderate", "high"].includes(risk)) {
    companies = await getCompaniesByRisk(risk);
  } else {
    companies = await getAllCompaniesService();
  }

  if (sortBy === "marketCap") {
    companies = companies.sort((a, b) => a.market_cap - b.market_cap);
  }

  if (sortBy === "name") {
    companies = companies.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (reverse === "true") {
    companies = companies.reverse();
  }

  res.status(200).send(companies.map((company) => company.toDAO()));
};
