import styles from "../styles/Footer.module.css";
import { Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div className={styles.main_footer}>
      <footer className={styles.footer}>
        <Col style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <a href="/" className={styles.footer_link}>
            Home ~
          </a>
          <a href="/stocks" className={styles.footer_link}>
            Stocks ~
          </a>
          <img
            src="/logo.png"
            alt="Logo of LIT"
            className={styles.footer_img}
          />
          <a href="/#how_works" className={styles.footer_link}>
            ~ How LIT Works
          </a>
          {/* <a href="/lit-api" className={styles.footer_link}>
            Developers
          </a> */}
        </Col>
        <span className={styles.text}>
          <span className={styles.highlight}>Little Invest Town</span> maps
          complex stock price data to an everyday scale that the result of us
          can understand
        </span>
        <br />
        <span className={styles.text}>
          Made in 🇮🇳 with ♥ by{" "}
          <a href="https://github.com/aemiej" className={styles.highlight}>
            Aemie Jariwala
          </a>{" "}
          and{" "}
          <a href="https://github.com/godcrampy" className={styles.highlight}>
            Sahil Bondre
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
