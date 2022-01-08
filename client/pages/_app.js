/* eslint-disable react/prop-types */
import "../styles/globals.css";
import Layout from "../Components/Layout.js";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
