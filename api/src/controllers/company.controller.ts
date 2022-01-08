import { RequestHandler, Request, Response } from "express";
import { getAllCompaniesService } from "../services/company.service";

export const getAllCompanies: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  const companies = await getAllCompaniesService();
  res.status(200).send(companies.map((company) => company.toDAO()));
};
