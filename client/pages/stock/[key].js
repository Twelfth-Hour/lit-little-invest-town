import Head from "next/head";
import { server } from "../../config/server.js";
import { Row, Col, InputGroup } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import { useState } from "react";

const Detail = ({ stock, similar }) => {
  /* eslint-disable no-unused-vars */
  const [currPrice, setCurr] = useState(stock.currPrice);

  /* eslint-enable no-unused-vars */
  return (
    <>
      <Head>
        <title>LIT: {stock.symbol} Insight</title>
        <meta
          name="description"
          content="Stock insights that you can understand"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row xs={12} lg={12} md={12} className={styles.wallpaper}>
        {/* <Col xs={4} md={4} lg={5}>
          <img
            src="/profile_bg.svg"
            alt="background profile"
            className={styles.bg_img}
          />
        </Col> */}
        <Col>
          <h3 className={styles.title}>
            Nobody beats {stock.profile} in explaining insights of{" "}
            {stock.symbol}
          </h3>
          <Row style={{ marginBottom: "1rem" }}>
            <Col>
              <img src={stock.avatar} className={styles.profile_img} />
            </Col>

            <Col xs={8} md={8} lg={8}>
              <Row>
                <span className={styles.name}>{stock.profile}</span>
              </Row>
              <Row>
                <span className={styles.sub}>{stock.sub_sector}</span>
              </Row>
              <Row className={styles.price_sec}>
                <InputGroup>
                  <InputGroup.Text>Current Stock Price</InputGroup.Text>
                  <InputGroup.Text className={styles.curr_price}>
                    {currPrice}
                  </InputGroup.Text>
                </InputGroup>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col xs={4} md={4} lg={4} className={styles.similar_container}>
          <h3>Similar Profiles</h3>
          {similar.map((item) => {
            return (
              <Row key={item.symbol} style={{ marginTop: ".5rem" }}>
                <Col xs={3} md={3} lg={3}>
                  <img src={item.avatar} className={styles.similar_img} />
                </Col>
                <Col>
                  <Row>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`${server}/stock/${item.symbol}`, "_blank");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <span className={styles.similar_title}>
                          {item.profile}
                        </span>
                        {" | "}
                        <span className={styles.similar_name}>
                          {item.symbol}
                        </span>
                      </div>
                    </a>
                  </Row>
                  <Row>
                    <span className={styles.similar_name}>{item.name}</span>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>

      <Row>
        <Col xs={4} md={4} lg={4}>
          <div className={styles.insight_title}>
            <span>Insights</span>
            <div className={styles.triangle_left}></div>
          </div>
        </Col>
        <Col className={styles.insight_container}>
          <div>
            {stock.insight.map((item, idx) => {
              return (
                <div key={idx}>
                  <span key={idx}>
                    {idx + 1}. {item}
                  </span>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Detail;

export const getServerSideProps = (context) => {
  let key = context.query.key;
  let insight = [
    "Alice makes and sells oil and electricity",
    "In 2021 Alice made 50 Lakh Rupees",
    "Last year she made 61 Lakh Rupees",
    "Out of this, she could save up 5 Lakh Rupees which is 20% more than what she saved last year",
    "Alice bought a new oil making machine for 3 Lakh Rupees",
    "Alice also invested 5 Lakh rupees in Mutual Funds",
    "Alice also paid her loan by 2 Lakh rupees and her loan now is 3.5 Lakhs",
  ];

  let similarProfiles = [
    {
      name: "Reliance Industries Limited",
      symbol: "RELIANCE",
      profile: "Raveen",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4D03AQGuSVxEgwSDaA/profile-displayphoto-shrink_800_800/0/1616911585841?e=1646870400&v=beta&t=cxUKCI7jqSaOEak9BegiCn7MivEturemGIGAPKv2JTI",
    },
    {
      name: "Kotak Mahindra Bank Limited",
      symbol: "KOTAKBANK",
      profile: "Kshitij",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4E03AQG-PDOJqcsBtA/profile-displayphoto-shrink_800_800/0/1627758064351?e=1646870400&v=beta&t=tbC0f2FGiiXfa0SImWFIp-eWRl_Ur2QxARj1LVsp6w4",
    },
    {
      name: "Sun Pharmaceutical Industries Limited",
      symbol: "SUNPHARMA",
      profile: "Sunny",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C5103AQHTbCiP412O8w/profile-displayphoto-shrink_800_800/0/1580654448686?e=1646870400&v=beta&t=lppNzlQdBstfRP_4yHb4Qsa6HkQSdxZrTMPdbqRlkuA",
    },
  ];

  let stock = {
    name: "Tata Consultancy Services Limited",
    symbol: key,
    profile: "Tania",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D03AQFiI0cCzdX-Qw/profile-displayphoto-shrink_800_800/0/1597827671191?e=1646870400&v=beta&t=ZQ9xOcOI5yA_22mDLOeMq_UBdl2KKxK0atR2H7RddkM",
    sector: "Information Technology",
    sub_sector: "IT Services & Consulting",
    insight,
    currPrice: 197308,
  };

  return {
    props: {
      stock,
      similar: similarProfiles,
    },
  };
};
