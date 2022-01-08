import Head from "next/head";
import { Row, Col, Pagination, Button } from "react-bootstrap";
import { useState } from "react";
import Company from "../Components/Company.js";
import { server } from "../config/server.js";
import styles from "../styles/Stock.module.css";


const Stock = ({ total, stocks }) => {
  const [page, setPage] = useState(1);
  const initialState = stocks.slice(0, 4);
  const totalPages = Math.ceil(total / 4);
  /* eslint-disable no-unused-vars */
  const [lst, setList] = useState(initialState);
  const [sort, setSort] = useState("Name");
  const [sortBy, setSortBy] = useState(0);
  const [risk, setRisk] = useState("");

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
                setList(stocks.slice(0, 4));
                window.scrollTo(0,0);
              }}
            />
            <Pagination.Prev
              disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                let cursor = 4 * page;
                setPage(page - 1);
                console.log(cursor - 4, cursor);
                setList(stocks.slice(cursor - 4, cursor));
                window.scrollTo(0,0);
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
                setList(stocks.slice(cursor, cursor + 4));
                window.scrollTo(0, 0);
              }}
            />
            <Pagination.Last
              onClick={(e) => {
                e.preventDefault();
                let cursor = 4 * (totalPages - 1);
                setPage(totalPages);
                setList(stocks.slice(cursor));
                window.scrollTo(0, 0);
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

export const getServerSideProps = async () => {

  let uri = `${server}/api/companies`;
  let response = await fetch(uri, {
    method: "POST",
    body: JSON.stringify({
      sort: "name",
      reverse: false
    })
  })

  let { data, err } = await response.json();
  if (err) {
    return {
      props: {
        total: 0,
        stocks: []
      }
    }
  }

  let total = data.length;

  return {
    props: {
      total,
      stocks: data,
    },
  };
};
