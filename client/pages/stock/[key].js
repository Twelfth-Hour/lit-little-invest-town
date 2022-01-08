import Head from "next/head";
import { server } from "../../config/server.js";
import names from "../../config/names.js";
import { Row, Col, InputGroup } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Avatar from "boring-avatars";

const Detail = ({ stock, similar }) => {
  /* eslint-disable no-unused-vars */
  const [currPrice, setCurr] = useState(stock.currPrice);
  const [profile, setProfile] = useState("");
  const isLetter = (c) => {
    return c.toLowerCase() != c.toUpperCase();
  };

  const firstAlpha = (s) => {
    let length = s.length;
    for (let idx = 0; idx < length; ++idx) {
      if (isLetter(s[idx])) return s[idx];
    }
  };

  const hashCode = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++)
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;

    return h;
  };

  const capitalizeFirstLetter = (string) => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getName = (sym) => {
    let hash = hashCode(sym);
    let charFirst = firstAlpha(sym);
    let list_ = names.filter((item) => item[0] === charFirst);
    let length = list_.length;

    if (length === 0) return capitalizeFirstLetter(sym);
    let z = length / hash;
    if (z < 0) z = z * -1;
    let m = -1 * Math.floor(Math.log(z) / Math.log(10) + 1);

    for (let idx = 0; idx < m; ++idx) z = z * 10;
    let name = list_[Math.floor(z * length)];
    return name;
  };

  useEffect(() => {
    let name = getName(stock.symbol);
    setProfile(name);
  }, []);

  setInterval(async () => {
    let key = stock.symbol;
    let response = await fetch(`${server}/api/stock_price`, {
      method: "POST",
      body: key,
    });

    let { data, err } = await response.json();
    let price = 0;
    if (data) price = data;
    if (price !== 0) {
      setCurr(price);
    }
  }, 30 * 60 * 1000);

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
      <Row>
        <Row xs={12} lg={12} md={12} className={styles.wallpaper}>
          <Col>
            <h3 className={styles.title}>
              Nobody beats {profile} in explaining insights of {stock.symbol}
            </h3>
            <Row style={{ marginBottom: "1rem" }}>
              <Col className={styles.profile_img}>
                <Avatar
                  size={100}
                  name={profile}
                  variant="beam"
                  colors={[
                    "#302727",
                    "#BA2D2D",
                    "#F2511B",
                    "#F2861B",
                    "#C7C730",
                  ]}
                />
              </Col>

              <Col xs={12} md={10} lg={9}>
                <Row>
                  <span className={styles.name}>{profile}</span>
                </Row>
                <Row>
                  <span className={styles.sub}>{stock.sub_sector}</span>
                </Row>
                <Row className={styles.price_sec}>
                  <InputGroup>
                    <InputGroup.Text>Risk</InputGroup.Text>
                    <InputGroup.Text className={styles.curr_price}>
                      {capitalizeFirstLetter(stock.risk)}
                    </InputGroup.Text>
                  </InputGroup>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={5} lg={4} className={styles.similar_container}>
            <h3>Similar Profiles</h3>
            {similar.map((item) => {
              return (
                <Row key={item.symbol} style={{ marginTop: ".5rem" }}>
                  <Col
                    xs={3}
                    md={3}
                    lg={3}
                    className={styles.similar_imgparent}
                  >
                    <Avatar
                      size={45}
                      name={getName(item.symbol)}
                      variant="beam"
                      colors={[
                        "#302727",
                        "#BA2D2D",
                        "#F2511B",
                        "#F2861B",
                        "#C7C730",
                      ]}
                    />
                  </Col>
                  <Col>
                    <Row>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `${server}/stock/${item.symbol}`,
                            "_blank"
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          <span className={styles.similar_title}>
                            {getName(item.symbol)}
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
          <Col xs={12} md={4} lg={4}>
            <div className={styles.insight_title}>
              <span>Insights</span>
              <div className={styles.triangle_left}></div>
            </div>
          </Col>
          <Col className={styles.insight_container}>
            <div>
              <b>In this year, {profile} has:</b> <br />
              {stock.insight.map((item, idx) => {
                return (
                  <div key={idx} className={styles.insight_point}>
                    <span key={idx}>{item.text}</span>

                    {item.info.length !== 0 ? (
                      <>
                        <button data-tip data-for={`${stock.symbol}-${idx}`}>
                          <img src="/info.svg" />
                        </button>
                        <ReactTooltip
                          id={`${stock.symbol}-${idx}`}
                          type="info"
                          effect="solid"
                        >
                          <span>{item.info}</span>
                        </ReactTooltip>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Detail;

export const getServerSideProps = async (context) => {
  let key = context.query.key;

  let response = await fetch(`${server}/api/stock_price`, {
    method: "POST",
    body: key,
  });

  let { data } = await response.json();
  let currPrice = 0;
  if (data) currPrice = data;

  response = await fetch(`${server}/api/insight`, {
    method: "POST",
    body: JSON.stringify({
      company: key,
    }),
  });

  let val = await response.json();

  let insight = [];
  let infoMap = [
    "Revenue earned by the company which is the total amount of money generated by the business",
    "The cost of components that go into manufacture of the product",
    "Cost of power consumption",
    "Employee and administrative expenses",
    "Total Profit = Revenue - Expenses - Taxes",
    "Current Assets including cash, cash equivalence, stock inventory",
    "Long Term Investment made by the company",
    "Debts taken by the company",
  ];
  val.data.forEach((item, idx) => {
    let obj = {
      text: item,
      info: infoMap[idx],
    };
    insight.push(obj);
  });

  response = await fetch(`${server}/api/similar`, {
    method: "POST",
    body: JSON.stringify({
      company: key,
    }),
  });

  val = await response.json();
  let similarProfiles = val.data.slice(0, 3);

  response = await fetch(`${server}/api/company`, {
    method: "POST",
    body: JSON.stringify({
      company: key,
    }),
  });

  val = await response.json();

  let stock = {
    name: val.data.name,
    symbol: key,
    sector: val.data.sector,
    sub_sector: val.data.sub_sector,
    risk: val.data.risk,
    insight,
    currPrice,
  };

  return {
    props: {
      stock,
      similar: similarProfiles,
    },
  };
};
