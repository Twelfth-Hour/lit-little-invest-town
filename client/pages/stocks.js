import Head from "next/head";
import { Col, Pagination } from "react-bootstrap";
import { useState } from "react";
import Company from "../Components/Company.js";
import styles from "../styles/Stock.module.css";

const Stock = ({ total, stocks }) => {
    const initialState = stocks;
    const totalPages = Math.ceil(total / 4);
    /* eslint-disable no-unused-vars */
    const [lst, setList] = useState(initialState);
    const [page, setPage] = useState(1);

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
                    return <Company item={item} />;
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
                <Pagination.Item className={styles.currPage}>{page}</Pagination.Item>
                <Pagination.Next 
                disabled={page === totalPages }
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
            total,
            stocks,
        },
    };
};
