import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './styles.scss';

/**
 * Component Navbar that crosses the entire application
 * title: string
 * menu: array of objects [{
 *  id
 *  name
 *  link
 * }...]
 */
export const Header = ({ title, menu = [] }) => {
  const buildMenu = () =>
    menu.map((item) => (
      <Link to={item.link} key={item.id}>
        <span>{item.name}</span>
      </Link>
    ));

  return (
    <Navbar key="sm" bg="light" expand="sm" className="mb-3 navbar-container">
      <Container fluid>
        <Link to="/" className="navbar-container__title">
          <Navbar.Brand>{title}</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end">
          {/* Mobile menu */}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Links */}
            <Nav className="justify-content-end flex-grow-1 pe-3 navbar-container__link-container">
              {buildMenu()}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
