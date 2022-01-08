import {
  bestDifferenceIndex,
  humanizeAmounts,
  INSIGHT_YEAR,
} from "../util/insight.util";

export const getRevenueInsightsService = (revenues: number[]): string => {
  revenues = revenues.reverse();
  const targetIndex = bestDifferenceIndex(revenues);
  const targetRevenue = revenues[targetIndex];
  const revenueGrowth = (revenues[0] - targetRevenue) / revenues[0];

  let insight = `💸 Made Rs. ${humanizeAmounts(revenues[0] * 100)} this year`;

  if (revenueGrowth > 0) {
    insight += `, which is ${
      Math.round(revenueGrowth * 1000) / 10
    }% more since ${INSIGHT_YEAR - targetIndex}.`;
  } else {
    insight += `, which has reduced by ${
      Math.round(revenueGrowth * -1000) / 10
    }% over last ${targetIndex} year(s).`;
  }

  return insight;
};

export const getRawMaterialsInsightsService = (
  rawMaterials: number
): string => {
  if (rawMaterials === 0) {
    return "🎨 Spent nothing on raw materials.";
  }
  return `🎨 Spent Rs. ${humanizeAmounts(
    rawMaterials * 100
  )} on Raw Materials.`;
};

export const getPowerInsightsService = (power: number): string => {
  if (power === 0) {
    return "⚡ Spent nothing on Electricity Bills and Fuel.";
  }
  return `⚡ Spent Rs. ${humanizeAmounts(
    power * 100
  )} on Electricity Bills and Fuel.`;
};

export const getEmployeeInsightsService = (employee: number): string => {
  if (employee === 0) {
    return "👷‍♂️ Had no Employees.";
  }
  return `👷‍♂️ Paid Rs. ${humanizeAmounts(
    employee * 100
  )} as salary to Employees.`;
};

export const getProfitInsightsService = (profits: number[]): string => {
  profits = profits.reverse();
  const targetIndex = bestDifferenceIndex(profits);
  const targetProfit = profits[targetIndex];
  const profitGrowth = (profits[0] - targetProfit) / profits[0];

  let insight = `💰 By the year end, was left with Rs. ${humanizeAmounts(
    profits[0] * 100
  )}`;

  if (profitGrowth > 0) {
    insight += `, which is ${
      Math.round(profitGrowth * 1000) / 10
    }% more as compared to ${INSIGHT_YEAR - targetIndex}.`;
  } else {
    insight += `, which has reduced by ${
      Math.round(profitGrowth * -1000) / 10
    }% over last ${targetIndex} year(s).`;
  }

  return insight;
};

export const getCashInsightsService = (cash: number[]): string => {
  cash = cash.reverse();
  const targetIndex = bestDifferenceIndex(cash);
  const targetCash = cash[targetIndex];
  const cashGrowth = (cash[0] - targetCash) / cash[0];

  let insight = `🏦 Has Rs. ${humanizeAmounts(
    cash[0] * 100
  )} in their bank account`;

  if (cashGrowth > 0) {
    insight += `, which is more by Rs. ${humanizeAmounts(
      (cash[0] - targetCash) * 100
    )} as compared to ${INSIGHT_YEAR - targetIndex}.`;
  } else {
    insight += `, which has reduced by Rs. ${humanizeAmounts(
      Math.abs((cash[0] - targetCash) * 100)
    )} over last ${targetIndex} year(s).`;
  }

  return insight;
};

export const getMutualFundInsightsService = (
  long_term_investment: number
): string => {
  if (long_term_investment === 0) {
    return "😢 Didn't invest anything in Mutual Funds till now.";
  }
  return `😎 Invested Rs. ${humanizeAmounts(
    long_term_investment * 100
  )} in Mutual Funds so far.`;
};

export const getLoanInsightsService = (loans: number[]): string => {
  const current_loan = loans[3];
  const last_year_loan = loans[2];

  if (current_loan == 0) {
    return "😊 No loans yay!";
  }

  if (current_loan > last_year_loan) {
    return `😟 Took additional loan of Rs. ${humanizeAmounts(
      (current_loan - last_year_loan) * 100
    )}, and now has Rs. ${humanizeAmounts(current_loan * 100)} in loans.`;
  }

  return `😊 Paid back Rs. ${humanizeAmounts(
    (last_year_loan - current_loan) * 100
  )} loan and now has Rs. ${humanizeAmounts(
    current_loan * 100
  )} left to be paid back.`;
};
