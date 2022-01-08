import csv from "csv-parser";
import fs from "fs";
import { BalanceSheetDAO } from "./dao/balance_sheet.dao";
import { CompanyDAO } from "./dao/company.dao";
import { IncomeStatementDAO } from "./dao/income_statement.dao";
import sequelize from "./db";
import BalanceSheet from "./models/balance_sheet.model";
import Company from "./models/company.model";
import IncomeStatement from "./models/income_statement.model";

const setupDB = async () => {
  console.log("Setting up database...");

  if (process.env.SETUP_DB_COMPANIES === "true") {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS "companies" CASCADE`);
      await sequelize.sync();

      const companies: CompanyDAO[] = [];

      fs.createReadStream("./data/company.csv")
        .pipe(csv())
        .on("data", async (data) => {
          companies.push({
            name: data.name,
            symbol: data.symbol,
            url: data.url,
            sector: data.sector,
            sub_sector: data.sub_sector,
            market_cap: Number(data.market_cap),
            risk: data.risk.toLowerCase(),
          });
        })
        .on("end", async () => {
          for (const company of companies) {
            try {
              await Company.create(company);
              console.log(`Created ${company.name}`);
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (process.env.SETUP_DB_BALANCE_SHEET === "true") {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS "balance_sheets" CASCADE`);
      await sequelize.sync();

      const companies = await Company.findAll();

      const companyMap = new Map<string, Company>();

      for (const company of companies) {
        companyMap.set(company.symbol, company);
      }

      const balanceSheets: { sheet: BalanceSheetDAO; symbol: string }[] = [];

      fs.createReadStream("./data/balance_sheet.csv")
        .pipe(csv())
        .on("data", async (data) => {
          balanceSheets.push({
            sheet: {
              year: data.year,
              current_assets: data.current_assets,
              cash: data.cash,
              receivables: data.receivables,
              inventory: data.inventory,
              non_current_assets: data.non_current_assets,
              loan: data.loan,
              equipment: data.equipment,
              goodwill: data.goodwill,
              long_term_investment: data.long_term_investment,
              total_assets: data.total_assets,
              long_term_debts: data.long_term_debts,
            },
            symbol: data.symbol,
          });
        })
        .on("end", async () => {
          for (const balanceSheet of balanceSheets) {
            try {
              const company = companyMap.get(balanceSheet.symbol);
              if (company) {
                console.log(company.name);
                const bs = await BalanceSheet.create(balanceSheet.sheet);
                await bs.setCompany(company);
              } else {
                throw "ERROR: Company not found for balance sheet";
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (process.env.SETUP_DB_INCOME_STATEMENT === "true") {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS "income_statements" CASCADE`);
      await sequelize.sync();

      const companies = await Company.findAll();

      const companyMap = new Map<string, Company>();

      for (const company of companies) {
        companyMap.set(company.symbol, company);
      }

      const incomeStatements: {
        statement: IncomeStatementDAO;
        symbol: string;
      }[] = [];

      fs.createReadStream("./data/income_statement.csv")
        .pipe(csv())
        .on("data", async (data) => {
          incomeStatements.push({
            statement: {
              year: data.year || 0,
              total_revenue: data.revenue || 0,
              raw_material_cost: data.raw_material_cost || 0,
              power_cost: data.power_cost || 0,
              employee_cost: data.employee_cost || 0,
              administrative_cost: data.administrative_cost || 0,
              operating_cost: data.operating_cost || 0,
              pbt: data.pbt || 0,
              net_income: data.net_income || 0,
            },
            symbol: data.symbol,
          });
        })
        .on("end", async () => {
          for (const incomeStatement of incomeStatements) {
            try {
              const company = companyMap.get(incomeStatement.symbol);
              if (company) {
                console.log(company.name);
                const is = await IncomeStatement.create(
                  incomeStatement.statement
                );
                await is.setCompany(company);
              } else {
                throw "ERROR: Company not found for balance sheet";
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("DB Setup Complete");
};

export default setupDB;
