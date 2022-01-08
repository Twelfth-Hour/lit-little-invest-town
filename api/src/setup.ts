import csv from "csv-parser";
import fs from "fs";
import { BalanceSheetDAO } from "./dao/balance_sheet.dao";
import { CompanyDAO } from "./dao/company.dao";
import sequelize from "./db";
import BalanceSheet from "./models/balance_sheet.model";
import Company from "./models/company.model";

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
    console.log("SETUP SHEET");
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

  console.log("DB Setup Complete");
};

export default setupDB;
