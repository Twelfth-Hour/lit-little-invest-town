import { uri } from "../../config/data.js";
import names from "../../config/names.js";



export default async (req, res) => {
  let body = JSON.parse(req.body);
  let sort = body.sort;
  let reverse = body.reverse;
  let risk = body.risk ?? "";

  try {
    let response = await fetch(`${uri}api/company?sortBy=${sort}&reverse=${reverse}&risk=${risk}`);
    let data = await response.json();

    res.status(200).json({ data, err: null });
  } catch (err) {
    res.status(500).json({ data: null, err });
  }
}