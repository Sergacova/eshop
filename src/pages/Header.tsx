import * as React from 'react';
import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, Link } from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAppSelector } from "../app/hooks";
import Search from './Search';


interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  return (
    <Navbar fixed="top" bg="primary" variant="primary">
      < Container >
        <Navbar.Brand>
          Shop
        </Navbar.Brand>
        <Search />
        <Nav.Link to="/products" as={NavLink}>
          Products
        </Nav.Link>
        <Nav.Link to="/login" as={NavLink}>
          Login
        </Nav.Link>
        <Link
          className="relative p-4 transition-transform hover:scale-110"
          to="/cart"
        >
          <AddShoppingCartIcon className="text-danger" />
          {totalQuantity > 0 && (
            <span className="absolute bottom-1.5 -right-2 bg-dark-500 text-white text-xs font-semibold mr-2 px-1.5 py-0.5 rounded">
              {totalQuantity}
            </span>
          )}
        </Link>




      </Container >

    </Navbar >

  );
};

export default Header;