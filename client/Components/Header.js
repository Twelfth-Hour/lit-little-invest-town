import {
  Navbar,
  Container,
  Nav,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import styles from "../styles/Header.module.css";

const Header = () => {
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
            <Nav.Link href={`/lit-api`} className={styles.link}>
              Developers
            </Nav.Link>
            <Nav.Link href={`/#how_works`} className={styles.link}>
              How LIT Works
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <InputGroup className="mb-3">
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
              />
            </InputGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
