import Head from "next/head";
import styles from "../styles/Stock.module.css";
import { Col, Button } from "react-bootstrap";
import { useState } from "react";

const Stock = ({ stocks }) => {
  const initialState = stocks;
  /* eslint-disable no-unused-vars */
  const [lst, setList] = useState(initialState);

  /* eslint-enable no-unused-vars */
  return (
    <>
      <Head>
        <title>LIT: Stocks</title>
        <meta name="description" content="The town with all stocks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col>
        <h1 style={{ marginBottom: "1rem" }}>Stocks</h1>
        {lst.map((item) => {
          return (
            <>
              <div className={styles.main}>
                <div>
                  <div className={styles.sec_text}>
                    <p className={styles.company_name}>{item.name}</p>
                    <p className={styles.company_sym}>{item.symbol}</p>
                  </div>
                  <div className={styles.avatar_sec}>
                    <img src={item.avatar} className={styles.img} />
                    <div className={styles.avatar_subsec}>
                      <div className={styles.info_sec}>
                        <p className={styles.profile}>{item.profile} </p>&nbsp;
                        <button>
                          <img src="/info.svg" />
                        </button>
                      </div>

                      <p>{item.sub_sector}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button className={styles.btn}>Analyze</Button>
                </div>
              </div>
            </>
          );
        })}
      </Col>
    </>
  );
};

export default Stock;

export const getServerSideProps = () => {
  // let cursor = 4;
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
  ];

  return {
    props: {
      stocks,
    },
  };
};
