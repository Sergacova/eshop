import * as React from 'react';
import {Container, Button, Nav, Navbar} from "react-bootstrap"
import {NavLink } from "react-router-dom"

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    return (
        <Navbar fixed="top" bg="primary" variant="primary">
            <Container>
                <Navbar.Brand>
                    Shop
                </Navbar.Brand>
                <Nav.Link to="/products" as={NavLink}>
              Products
            </Nav.Link>
          
          
            <Nav.Link to="/login" as={NavLink}>
              Login
            </Nav.Link>
  
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "primary",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
        3
            </div>
          </Button>
     

            </Container>
      </Navbar>
  );
};

export default Header;