import Head from "next/head";
import { Row, Col, Pagination, Button } from "react-bootstrap";
import { useState } from "react";
import Company from "../Components/Company.js";
import styles from "../styles/Stock.module.css";

const Stock = ({ total, stocks }) => {
  const initialState = stocks;
  const totalPages = Math.ceil(total / 4);
  /* eslint-disable no-unused-vars */
  const [lst, setList] = useState(initialState);
  const [sort, setSort] = useState("Name");
  const [sortBy, setSortBy] = useState(0);
  const [risk, setRisk] = useState("");
  const [page, setPage] = useState(1);

  /* eslint-enable no-unused-vars */
  return (
    <>
      <Head>
        <title>LIT: Stocks</title>
        <meta name="description" content="The town with all stocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <Col>
          <h1 style={{ marginBottom: "1rem" }}>Stocks</h1>
          {lst.map((item) => {
            return <Company item={item} key={item.symbol} />;
          })}
          <Pagination>
            <Pagination.First
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
                // create api to get first page information
              }}
            />
            <Pagination.Prev
              disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(page - 1);
                // create api to get next page information
              }}
            />
            <Pagination.Item className={styles.currPage}>
              {page}
            </Pagination.Item>
            <Pagination.Next
              disabled={page === totalPages}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
                // create api to get next page information
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                e.preventDefault();
                setPage(totalPages);
                // create api to get last page information
              }}
            />
          </Pagination>
        </Col>
        <Col xs={4} md={4} lg={4}>
          <div className={styles.style_sec}>
            <Row className={styles.sort_sec}>
              <h5>Sort</h5>
              <div>
                {sort === "Name" ? (
                  <>
                    {sortBy === 0 ? (
                      <Button
                        className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                        onClick={(e) => {
                          let by = sortBy === 0 ? 1 : 0;
                          e.preventDefault();
                          setSortBy(by);
                          setSort("Name");
                        }}
                      >
                        Name &uarr;{" "}
                      </Button>
                    ) : (
                      <Button
                        className={`${styles.btn} ${styles.sort_btn}  ${styles.active}`}
                        onClick={(e) => {
                          let by = sortBy === 0 ? 1 : 0;
                          e.preventDefault();
                          setSortBy(by);
                          setSort("Name");
                        }}
                      >
                        Name &darr;{" "}
                      </Button>
                    )}{" "}
                  </>
                ) : (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSortBy(0);
                      setSort("Name");
                    }}
                  >
                    Name &uarr;{" "}
                  </Button>
                )}
                {sort === "Cap" ? (
                  <>
                    {sortBy === 0 ? (
                      <Button
                        className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                        onClick={(e) => {
                          let by = sortBy === 0 ? 1 : 0;
                          e.preventDefault();
                          setSortBy(by);
                          setSort("Cap");
                        }}
                      >
                        Market Cap &uarr;{" "}
                      </Button>
                    ) : (
                      <Button
                        className={`${styles.btn} ${styles.sort_btn}  ${styles.active}`}
                        onClick={(e) => {
                          let by = sortBy === 0 ? 1 : 0;
                          e.preventDefault();
                          setSortBy(by);
                          setSort("Cap");
                        }}
                      >
                        Market Cap &darr;{" "}
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSortBy(0);
                      setSort("Cap");
                    }}
                  >
                    Market Cap &uarr;
                  </Button>
                )}
              </div>
            </Row>
            <br />
            <Row className={styles.filter_sec}>
              <h5>Filter by Risk</h5>
              <div>
                {risk === "Low" ? (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("");
                    }}
                  >
                    Low
                  </Button>
                ) : (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("Low");
                    }}
                  >
                    Low
                  </Button>
                )}
                {risk === "Medium" ? (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("");
                    }}
                  >
                    Medium
                  </Button>
                ) : (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("Medium");
                    }}
                  >
                    Medium
                  </Button>
                )}
                {risk === "High" ? (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("");
                    }}
                  >
                    High
                  </Button>
                ) : (
                  <Button
                    className={`${styles.btn} ${styles.sort_btn}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setRisk("High");
                    }}
                  >
                    High
                  </Button>
                )}
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Stock;

export const getServerSideProps = () => {
  // let cursor = 4;
  let total = 4;
  let stocks = [
    {
      name: "Reliance Industries Limited",
      symbol: "RELIANCE",
      profile: "Raveen",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4D03AQGuSVxEgwSDaA/profile-displayphoto-shrink_800_800/0/1616911585841?e=1646870400&v=beta&t=cxUKCI7jqSaOEak9BegiCn7MivEturemGIGAPKv2JTI",
      sector: "Energy",
      sub_sector: "Oil & Gas - Refining & Marketing",
    },
    {
      name: "Tata Consultancy Services Limited",
      symbol: "TCS",
      profile: "Tania",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4D03AQFiI0cCzdX-Qw/profile-displayphoto-shrink_800_800/0/1597827671191?e=1646870400&v=beta&t=ZQ9xOcOI5yA_22mDLOeMq_UBdl2KKxK0atR2H7RddkM",
      sector: "Information Technology",
      sub_sector: "IT Services & Consulting",
    },
    {
      name: "Kotak Mahindra Bank Limited",
      symbol: "KOTAKBANK",
      profile: "Kshitij",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C4E03AQG-PDOJqcsBtA/profile-displayphoto-shrink_800_800/0/1627758064351?e=1646870400&v=beta&t=tbC0f2FGiiXfa0SImWFIp-eWRl_Ur2QxARj1LVsp6w4",
      sector: "Financials",
      sub_sector: "Private Banks",
    },
    {
      name: "Sun Pharmaceutical Industries Limited",
      symbol: "SUNPHARMA",
      profile: "Sunny",
      avatar:
        "https://media-exp1.licdn.com/dms/image/C5103AQHTbCiP412O8w/profile-displayphoto-shrink_800_800/0/1580654448686?e=1646870400&v=beta&t=lppNzlQdBstfRP_4yHb4Qsa6HkQSdxZrTMPdbqRlkuA",
      sector: "Health Care",
      sub_sector: "Pharmaceuticals",
    },
  ];

  return {
    props: {
      total,
      stocks,
    },
  };
};
