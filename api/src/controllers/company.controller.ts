import { RequestHandler, Request, Response } from "express";
import Company from "../models/company.model";
import {
  getAllCompaniesService,
  getCompaniesByRisk,
  getCompanyBySymbolService,
  getSimilarCompaniesService,
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

export const getSimilarCompanies: RequestHandler<{
  symbol: string;
}> = async (req: Request<{ symbol: string }>, res: Response) => {
  const symbol = req.params.symbol;
  const company = await getCompanyBySymbolService(symbol);
  if (!company) {
    res.status(404).send("Company not found");
    return;
  }

  const sector = company.sector;
  const similarCompanies = await getSimilarCompaniesService(sector, symbol);

  res.status(200).send(similarCompanies.map((company) => company.toDAO()));
};

export const getCompanyBySymbol: RequestHandler<{
  symbol: string;
}> = async (req: Request<{ symbol: string }>, res: Response) => {
  const symbol = req.params.symbol;
  const company = await getCompanyBySymbolService(symbol);
  if (!company) {
    res.status(404).send("Company not found");
    return;
  }

  res.status(200).send(company.toDAO());
};
