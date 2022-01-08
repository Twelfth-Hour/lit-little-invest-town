import Company from "../models/company.model";

export const getAllCompaniesService = async (): Promise<Company[]> => {
  return await Company.findAll();
};

export const getCompaniesByRisk = async (risk: string): Promise<Company[]> => {
  return await Company.findAll({ where: { risk } });
};
