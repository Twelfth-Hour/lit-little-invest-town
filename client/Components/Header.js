import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  /* eslint-disable no-unused-vars */
  const [search, setSearch] = useState("");

  /* eslint-enable no-unused-vars */
  return (
    <Navbar className={styles.navbar} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" className={styles.mainLink}>
          <img src="/logo.png" alt="Logo of LIT" className={styles.logo_img} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={`${styles.navbar_toggler} ${styles.navbar_toggler_icon}`}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/stocks" className={styles.link}>
              Stocks
            </Nav.Link>
            {/* <Nav.Link href={`/lit-api`} className={styles.link}>
              Developers
            </Nav.Link> */}
            <Nav.Link href={`/#how_works`} className={styles.link}>
              How LIT Works
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <img
                  src="/search.svg"
                  alt="search icon"
                  style={{ width: "1rem" }}
                />
              </InputGroup.Text>
              <FormControl
                placeholder="Search Stocks"
                aria-label="Search Stocks"
                aria-describedby="basic-addon1"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className={styles.search_btn}>Search</Button>
            </InputGroup> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
