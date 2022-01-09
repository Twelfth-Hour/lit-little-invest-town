import Head from "next/head";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Company from "../Components/Company.js";
import { server } from "../config/server.js";
import styles from "../styles/Stock.module.css";
import mapSec from "../Components/SectorMap";

const Plan = () => {
  const [list_, setList] = useState([]);
  const [analytics, setAnaly] = useState([]);

  const capitalizeFirstLetter = (string) => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const analyzeRisk = (risks) => {
    const riskVals = risks.map(
      (e) => ["low", "moderate", "high"].indexOf(e) + 1
    );
    const sum = riskVals.reduce((a, b) => a + b, 0);
    const avg = sum / riskVals.length || 0;

    if (avg < 1.5) {
      return "Low 😄";
    }

    if (avg < 2.5) {
      return "Moderate 😎";
    }

    return "High 😯";
  };

  useEffect(() => {
    let lis_ = localStorage.getItem("plan");
    if (lis_ !== undefined && lis_ !== null) {
      let list_temp = JSON.parse(lis_);
      setList(list_temp);

      let sectors = [];
      list_temp.forEach((item) => {
        if (!sectors.includes(item.sector))
          sectors.push(`${mapSec[item.sector]} ${item.sector}`);
      });
      sectors = [...new Set(sectors)];

      let risks = list_temp.map((item) => item.risk);
      let avgRisk = analyzeRisk(risks);

      let item1 = `🏃‍♂️ Number of stocks: ${list_temp.length}`;
      let item2 = `🌈 Sectors in the portfolio: ${sectors.join(", ")}`;
      let item3 = `🔥 Risk of portfolio: ${capitalizeFirstLetter(avgRisk)}`;
      let lst = [item1, item2, item3];
      setAnaly(lst);
    }
  }, []);

  return (
    <>
      <Head>
        <title>LIT: Personal Investment Plan</title>
        <meta name="description" content="The town with all stocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Row>
          <Col>
            <h1 style={{ marginBottom: "1rem" }}>Personal Investment Plan</h1>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <Button
              style={{ background: "#9B0100 !important" }}
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                setList([]);
                setAnaly([]);
                localStorage.removeItem("plan");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>

        <Row className={styles.main}>
          <Col>
            <div className={styles.sec_text}>
              {list_.length !== 0 ? (
                <p className={styles.company_name}>
                  {"Here's"} how your plan looks like &#8594;
                </p>
              ) : (
                <p className={styles.company_name}>
                  View stocks and grow your plan!{" "}
                </p>
              )}
            </div>
            {analytics.map((item, idx) => {
              return (
                <div key={idx} className={styles.insight_point}>
                  <span key={idx}>
                    {idx + 1}. {item}
                  </span>
                </div>
              );
            })}
          </Col>
          <Col xs={12} md={3} lg={3}>
            <Button
              className={styles.btn}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${server}/stocks`;
              }}
            >
              Grow Plan
            </Button>
          </Col>
        </Row>
        <Row className={styles.stock_page}>
          <Col>
            {list_.map((item) => {
              return <Company item={item} key={item.symbol} />;
            })}
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Plan;
