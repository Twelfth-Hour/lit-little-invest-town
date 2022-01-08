import Company from "../models/company.model";

export const getAllCompaniesService = async (): Promise<Company[]> => {
  return await Company.findAll();
};
