const uri = "http://localhost:3001/";

export default async (req, res) => {
    let company = req.body;

    try {
        let response = await fetch(
          `${uri}nse/get_quote_info?companyName=${company}`
        );
        let data = await response.json();
        let price = data.data[0].closePrice;

        res.status(200).json({ data: price, err: null });
      } catch (err) {
        res.status(500).json({ data: null, err });
      }
}