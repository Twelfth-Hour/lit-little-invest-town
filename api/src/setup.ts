import csv from "csv-parser";
import fs from "fs";
import { CompanyDAO } from "./dao/company.dao";
import sequelize from "./db";
import Company from "./models/company.model";

const setupDB = async () => {
  console.log("Setting up database...");
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

  console.log("DB Setup Complete");
};

export default setupDB;
