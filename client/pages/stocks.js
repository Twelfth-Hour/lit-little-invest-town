import Head from "next/head";
import { Row, Col, Pagination, Button } from "react-bootstrap";
import { useState } from "react";
import Company from "../Components/Company.js";
import { server } from "../config/server.js";
import styles from "../styles/Stock.module.css";

const Stock = ({ total, stocks }) => {
  const [page, setPage] = useState(1);
  const initialState = stocks.slice(0, 4);
  const [totalPages, setTP] = useState(Math.ceil(total / 4));
  /* eslint-disable no-unused-vars */
  const [lst, setList] = useState(initialState);
  const [fullList, setFullList] = useState(stocks);
  const [sort, setSort] = useState("name");
  const [sortBy, setSortBy] = useState(0);
  const [risk, setRisk] = useState("");

  /* eslint-enable no-unused-vars */
  const updateStocks = async (sort, sortBy, risk) => {
    let reverse = sortBy === 0 ? false : true;
    let uri = `${server}/api/companies`;
    console.log(
      JSON.stringify({
        sort,
        reverse,
        risk,
      })
    );
    let response = await fetch(uri, {
      method: "POST",
      body: JSON.stringify({
        sort,
        reverse,
        risk,
      }),
    });

    let { data, err } = await response.json();
    if (data) {
      setList(data.slice(0, 4));
      setFullList(data);
      setPage(1);
      setTP(Math.ceil(data.length / 4));
    } else {
      alert(err);
    }
  };

  return (
    <>
      <Head>
        <title>LIT: Stocks</title>
        <meta name="description" content="The town with all stocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>
        <h1 style={{ marginBottom: "1rem" }}>Stocks</h1>
        <Row className={styles.stock_page}>
          <Col>
            {lst.map((item) => {
              return <Company item={item} key={item.symbol} />;
            })}
            <Pagination>
              <Pagination.First
                onClick={(e) => {
                  e.preventDefault();
                  setPage(1);
                  setList(fullList.slice(0, 4));
                  window.scrollTo(0, 0);
                }}
              />
              <Pagination.Prev
                disabled={page === 1}
                onClick={(e) => {
                  e.preventDefault();
                  let cursor = 4 * page;
                  setPage(page - 1);
                  console.log(cursor - 4, cursor);
                  setList(fullList.slice(cursor - 4, cursor));
                  window.scrollTo(0, 0);
                }}
              />
              <Pagination.Item className={styles.currPage}>
                {page}
              </Pagination.Item>
              <Pagination.Next
                disabled={page === totalPages}
                onClick={(e) => {
                  e.preventDefault();
                  let cursor = 4 * page;
                  setPage(page + 1);
                  setList(fullList.slice(cursor, cursor + 4));
                  window.scrollTo(0, 0);
                }}
              />
              <Pagination.Last
                onClick={(e) => {
                  e.preventDefault();
                  let cursor = 4 * (totalPages - 1);
                  setPage(totalPages);
                  setList(fullList.slice(cursor));
                  window.scrollTo(0, 0);
                }}
              />
            </Pagination>
          </Col>
          <Col xs={12} md={12} lg={4}>
            <div className={styles.style_sec}>
              <Row className={styles.sort_sec}>
                <h5>Sort</h5>
                <div>
                  {sort === "name" ? (
                    <>
                      {sortBy === 0 ? (
                        <Button
                          className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                          onClick={async (e) => {
                            let by = sortBy === 0 ? 1 : 0;
                            e.preventDefault();
                            setSortBy(by);
                            setSort("name");
                            await updateStocks("name", by, risk);
                          }}
                        >
                          Name &uarr;{" "}
                        </Button>
                      ) : (
                        <Button
                          className={`${styles.btn} ${styles.sort_btn}  ${styles.active}`}
                          onClick={async (e) => {
                            let by = sortBy === 0 ? 1 : 0;
                            e.preventDefault();
                            setSortBy(by);
                            setSort("name");
                            await updateStocks("name", by, risk);
                          }}
                        >
                          Name &darr;{" "}
                        </Button>
                      )}{" "}
                    </>
                  ) : (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setSortBy(0);
                        setSort("name");
                        await updateStocks("name", 0, risk);
                      }}
                    >
                      Name &uarr;{" "}
                    </Button>
                  )}
                  {sort === "marketCap" ? (
                    <>
                      {sortBy === 0 ? (
                        <Button
                          className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                          onClick={async (e) => {
                            let by = sortBy === 0 ? 1 : 0;
                            e.preventDefault();
                            setSortBy(by);
                            setSort("marketCap");
                            await updateStocks("marketCap", by, risk);
                          }}
                        >
                          Market Cap &uarr;{" "}
                        </Button>
                      ) : (
                        <Button
                          className={`${styles.btn} ${styles.sort_btn}  ${styles.active}`}
                          onClick={async (e) => {
                            let by = sortBy === 0 ? 1 : 0;
                            e.preventDefault();
                            setSortBy(by);
                            setSort("marketCap");
                            await updateStocks("marketCap", by, risk);
                          }}
                        >
                          Market Cap &darr;{" "}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setSortBy(0);
                        setSort("marketCap");
                        await updateStocks("marketCap", 0, risk);
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
                  {risk === "low" ? (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("");
                        let r = risk === "low" ? "" : risk;
                        await updateStocks(sort, sortBy, r);
                      }}
                    >
                      Low
                    </Button>
                  ) : (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("low");
                        await updateStocks(sort, sortBy, "low");
                      }}
                    >
                      Low
                    </Button>
                  )}
                  {risk === "medium" ? (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("");
                        let r = risk === "medium" ? "" : risk;
                        await updateStocks(sort, sortBy, r);
                      }}
                    >
                      Medium
                    </Button>
                  ) : (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("medium");
                        await updateStocks(sort, sortBy, "medium");
                      }}
                    >
                      Medium
                    </Button>
                  )}
                  {risk === "high" ? (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn} ${styles.active}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("");
                        let r = risk === "high" ? "" : risk;
                        await updateStocks(sort, sortBy, r);
                      }}
                    >
                      High
                    </Button>
                  ) : (
                    <Button
                      className={`${styles.btn} ${styles.sort_btn}`}
                      onClick={async (e) => {
                        e.preventDefault();
                        setRisk("high");
                        await updateStocks(sort, sortBy, "high");
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
      </Row>
    </>
  );
};

export default Stock;

export const getServerSideProps = async () => {
  let uri = `${server}/api/companies`;
  let response = await fetch(uri, {
    method: "POST",
    body: JSON.stringify({
      sort: "name",
      reverse: false,
    }),
  });

  let { data, err } = await response.json();
  if (err) {
    return {
      props: {
        total: 0,
        stocks: [],
      },
    };
  }

  let total = data.length;

  return {
    props: {
      total,
      stocks: data,
    },
  };
};
