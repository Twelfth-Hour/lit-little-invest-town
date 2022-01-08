import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Landing from "../public/landing.png";
import { server } from "../config/server.js";

// red - f54748, heading - 2e2e2e, text - 595959, background - fff5f5, yellow - fdc55e
export default function Home() {
  return (
    <div>
      <Head>
        <title>LIT: Little Invest Town</title>
        <meta name="description" content="Investment for the rest of us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className={styles.container}>
        <Col>
          <Row className={styles.heading}>
            <p>
              Analyze stocks as easily as buying a coffee.{" "}
              <span className={styles.highlight}>LITerally!</span>
            </p>
          </Row>
          <Row className={styles.text}>
            <span>
              <span className={styles.highlight}>Little Invest Town</span> maps
              complex stock price data to an everyday scale that the result of
              us can understand. Do not keep yourself waiting and improvise your
              decision making in the world of stocks
            </span>
          </Row>
          <Row>
            <Button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${server}/stocks`;
              }}
            >
              View Stock Profiles
            </Button>
          </Row>
        </Col>
        <Col>
          <Image
            src={Landing}
            alt="landing image"
            className={styles.landing_img}
          />
        </Col>
      </Row>

      <Row className={styles.container}>
        <Col>
          <img
            src="/how_works.png"
            alt="How LIT Works image"
            className={styles.how_works_img}
          />
        </Col>
        <Col>
          <Row className={styles.heading}>
            <p>
              How does <span className={styles.highlight}>LIT</span> work❓
            </p>
          </Row>
          <Row className={styles.text}>
            <span>
              <span className={styles.highlight}>Little Invest Town</span> maps
              complex stock price data to an everyday scale that the result of
              us can understand
            </span>
          </Row>
          <br />
          <Row className={styles.text}>
            <span>
              <img
                src="/pointer.svg"
                alt="pointer"
                style={{ width: "1.5rem" }}
              />{" "}
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto
            </span>
            <span>
              <img
                src="/pointer.svg"
                alt="pointer"
                style={{ width: "1.5rem" }}
              />{" "}
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto
            </span>
            <span>
              <img
                src="/pointer.svg"
                alt="pointer"
                style={{ width: "1.5rem" }}
              />{" "}
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto
            </span>
          </Row>
        </Col>
      </Row>

      <Col id="how_works">
        <Row className={`${styles.second_heading}`}>
          <span>
            Analyze the <span className={styles.highlight}>top companies</span>{" "}
            of the stock market
          </span>
        </Row>
        <Row>
          <img
            src="/company.png"
            alt="companies logo"
            className={styles.company_logo_img}
          />
        </Row>
      </Col>
    </div>
  );
}
