import styles from "../styles/Stock.module.css";
import { Button, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import mapSec from "./SectorMap";
import { server } from "../config/server";
import Avatar from "boring-avatars";
import names from "../config/names.js";
import { useState, useEffect } from "react";


const Company = ({ item }) => {
  const [profile, setProfile] = useState('');
  const isLetter = (c) => {
    return c.toLowerCase() != c.toUpperCase();
  }
  
  const firstAlpha = (s) => {
    let length = s.length;
    for (let idx = 0; idx < length; ++idx) {
        if (isLetter(s[idx])) return s[idx];
    }
  }
  
  const hashCode = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++)
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  
    return h;
  }
  
  const capitalizeFirstLetter = (string) => {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const getName = (sym) => {
    let hash = hashCode(sym);
    let charFirst = firstAlpha(sym);
    let list_ = names.filter(item => item[0] === charFirst);
    let length = list_.length;
  
    if (length === 0) return capitalizeFirstLetter(sym);
    let z = length / hash;
    if (z < 0) z = z * -1;
    let m = -1 * Math.floor( (Math.log(z) / Math.log(10)) + 1);
  
    for (let idx = 0; idx < m; ++idx) z = z * 10;
    let name = list_[Math.floor(z*length)];
    return name;
  }

  useEffect(() => {
    let name = getName(item.symbol);
    setProfile(name);
  }, []);

  return (
    <>
      <Row className={styles.main} key={item.symbol}>
        <Col>
          <div className={styles.sec_text}>
            <p className={styles.company_name}>{item.name}</p>
            <p className={styles.company_sym}>{item.symbol}</p>
          </div>
          <div>
            <p className={styles.descrip}>{item.sub_sector}</p>
          </div>
          <div className={styles.avatar_sec}>
          <Avatar
            size={50}
            name={profile}
            variant="beam"
            colors={["#302727", "#BA2D2D", "#F2511B", "#F2861B", "#C7C730"]}
          />
            <div className={styles.avatar_subsec}>
              <div className={styles.info_sec}>
                <p className={styles.profile}>{profile} </p>&nbsp;
                <button data-tip data-for={`infoCompany-${item.symbol}`}>
                  <img src="/info.svg" />
                </button>
                <ReactTooltip
                  id={`infoCompany-${item.symbol}`}
                  type="info"
                  effect="solid"
                >
                  <span>
                    {profile} represents the company {item.name}. <br />
                    Click on analyze to know more 📈
                  </span>
                </ReactTooltip>
              </div>

              <p>
                {mapSec[item.sector]} {item.sector}
              </p>
            </div>
          </div>
        </Col>
        <Col xs={3} md={3} lg={3}>
          <Button
            className={styles.btn}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `${server}/stock/${item.symbol}`;
            }}
          >
            Analyze
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Company;
