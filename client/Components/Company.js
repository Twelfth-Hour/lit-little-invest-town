import styles from "../styles/Stock.module.css";
import { Button } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

const Company = ({ item }) => {
    return (
        <>
            <div className={styles.main} key={item.symbol}>
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
}

export default Company;