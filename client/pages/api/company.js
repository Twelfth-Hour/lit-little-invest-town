import { uri } from "../../config/data.js";

export default async (req, res) => {
  let body = JSON.parse(req.body);
  let company = body.company;

  try {
    let response = await fetch(`${uri}api/company/${company}`);
    let data = await response.json();
    res.status(200).json({ data, err: null });
  } catch (err) {
    res.status(500).json({ data: null, err });
  }
};
