import * as React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap"
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
  
        
     

            </Container>
      </Navbar>
  );
};

export default Header;