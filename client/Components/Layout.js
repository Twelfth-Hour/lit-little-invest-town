import Header from "./Header.js";
import Footer from "./Footer.js";
import styles from "../styles/Home.module.css";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container className={styles.container}>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
