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

      <Row className={styles.container_2} id="how_works">
        <Col className={styles.works_visual}>
          <Row style={{ alignItems: "center" }}>
            <Col xs={4} md={4} lg={4}>
              <img
                src="/coffee.png"
                alt="coffee icon"
                style={{ width: "10rem" }}
              />
            </Col>
            <Col>
              <span className={styles.imageHeading}>Coffee @ 200 Rs 🥵</span>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col xs={4} md={4} lg={4}>
              <img
                src="/mobile.png"
                alt="mobile icon"
                style={{ width: "10rem" }}
              />
            </Col>
            <Col>
              <span className={styles.imageHeading}>iPhone @ 20K Rs 🤑</span>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col xs={4} md={4} lg={4}>
              <img
                src="/laptop.png"
                alt="laptop icon"
                style={{ width: "10rem" }}
              />
            </Col>
            <Col>
              <span className={styles.imageHeading}>
                TCS Share @ 3800 Rs 🤔
              </span>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row className={styles.heading}>
            <p>
              How does <span className={styles.highlight}>LIT</span> work❓
            </p>
          </Row>
          <br />
          <Row className={styles.text}>
            <span style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            📌 &nbsp;
              LIT scales down company profile to a personal level
            </span>
            <span style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            📌 &nbsp;
              Each company is represented by a character with similar finances
            </span>
            <span style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            📌 &nbsp;
              LIT flattens the learning curve to understand company portfolios
              by converting complex financial jargon into simple everyday words
            </span>
            <span style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            📌 &nbsp;
              LIT simplifies decision making while buying shares for people with
              a non-finance background
            </span>
          </Row>
        </Col>
      </Row>

      <Col>
        <Row className={`${styles.second_heading}`}>
          <span>
            Analyze the <span className={styles.highlight}>top companies</span>{" "}
            of the stock market
          </span>
        </Row>
        <Row className={styles.company_sec}>
          <Col><img src="/reliance.png" alt="reliance" style={{ width: "120px" }}/></Col>
          <Col><img src="/hdfc.png" alt="hdfc" style={{ width: "85px" }}/></Col>
          <Col><img src="/wipro.png" alt="wipro" style={{ width: "120px" }}/></Col>
          <Col><img src="/tcs.png" alt="tcs" style={{ width: "120px" }}/></Col>
          <Col><img src="/infosys.png" alt="infosys" style={{ width: "120px" }}/></Col>
          <div className={styles.break_sec}></div>
          <Col><img src="/kotak.png" alt="kotak" style={{ width: "120px" }}/></Col>
          <Col><img src="/asian_paints.png" alt="asian paints" style={{ width: "120px" }}/></Col>
          <Col><img src="/airtel.svg" alt="airtel" style={{ width: "85px" }}/></Col>
          <Col><img src="/maruti.png" alt="maruti suzuki" style={{ width: "120px" }}/></Col>
          <Col><img src="/whirpool.png" alt="whirpool" style={{ width: "120px" }}/></Col>
        </Row>
      </Col>
    </div>
  );
}
