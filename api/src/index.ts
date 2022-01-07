import app from "./app";

const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = process.env.NODE_ENV == "production";

app.listen(PORT, () => {
  if (!IS_PRODUCTION) {
    console.log(`Server running on port ${PORT}`);
  }
});
