export interface IncomeStatementDAO {
  year: number;
  total_revenue: number;
  raw_material_cost: number;
  power_cost: number;
  employee_cost: number;
  administrative_cost: number;
  operating_cost: number;
  pbt: number;
  net_income: number;
}
