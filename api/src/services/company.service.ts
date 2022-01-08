import Company from "../models/company.model";
import { Op } from "sequelize";

export const getAllCompaniesService = async (): Promise<Company[]> => {
  return await Company.findAll();
};

export const getCompaniesByRisk = async (risk: string): Promise<Company[]> => {
  return await Company.findAll({ where: { risk } });
};

export const getCompanyBySymbol = async (
  symbol: string
): Promise<Company | null> => {
  return await Company.findOne({ where: { symbol } });
};

export const getSimilarCompaniesService = async (
  sector: string,
  symbol: string
): Promise<Company[]> => {
  return await Company.findAll({
    where: {
      sector,
      symbol: {
        [Op.ne]: symbol,
      },
    },
    limit: 5,
    order: [["market_cap", "DESC"]],
  });
};
