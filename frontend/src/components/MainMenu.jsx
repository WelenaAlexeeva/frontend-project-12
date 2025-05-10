import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../context/AuthContext';
import routes from '../routes';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const { t } = useTranslation();

  const logOut = () => {
    auth.logOut();
    navigate(routes.loginPagePath);
  };

  return (
    <Navbar className="shadow-sm navbar-light bg-white">
      <Container>
        <Navbar.Brand href={routes.homePagePath}>
          {t('nav.navbarBrandText')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {auth.loggedIn && (
              <Button variant="primary" onClick={logOut}>
                {t('nav.logoutButton')}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
