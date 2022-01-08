import styles from "../styles/Stock.module.css";
import { Button, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import mapSec from "./SectorMap";

const Company = ({ item }) => {
    return (
        <>
            <Row className={styles.main} key={item.symbol}>
                <Col>
                    <div className={styles.sec_text}>
                        <p className={styles.company_name}>{item.name}</p>
                        <p className={styles.company_sym}>{item.symbol}</p>
                        <div>
                        <p className={styles.descrip}>{item.symbol} belongs to the sub sector {item.sub_sector} which falls under the 
                    sector of {item.sector} </p>
                        </div>
                    </div>
                    <div className={styles.avatar_sec}>
                        <img src={item.avatar} className={styles.img} />
                        <div className={styles.avatar_subsec}>
                            <div className={styles.info_sec}>
                                <p className={styles.profile}>{item.profile} </p>&nbsp;
                        <button data-tip data-for={`infoCompany-${item.symbol}`}>
                                    <img src="/info.svg" />
                                </button>
                                <ReactTooltip
                                    id={`infoCompany-${item.symbol}`}
                                    type="info"
                                    effect="solid"
                                >
                                    <span>{item.profile} represents the company {item.name}. <br />
                            Click on analyze to know more 📈</span>
                                </ReactTooltip>
                            </div>

                            <p>{mapSec[item.sector]} {item.sector}</p>
                        </div>
                    </div>
                </Col>
                <Col xs={3} md={3} lg={3}>
                    <Button className={styles.btn}>Analyze</Button>
                </Col>
            </Row>
        </>
    );
}

export default Company;