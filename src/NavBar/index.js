import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory, fetchProductsIfNeeded } from '../Actions';

const NavBar = ({ cart, selectCategory, fetchProductsIfNeeded }) => {
  let category = '';

  const handleChange = e => {
    category = e.target.value;
    selectCategory(category);
  };

  const handleClick = () => {
    fetchProductsIfNeeded(category);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <NavbarBrand href="/">Shopping Cart</NavbarBrand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/products">
          Products
        </Nav.Link>
        <Nav.Link as={Link} to="/checkout">
          Cart({cart.length})
        </Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          as="select"
          name="category"
          placeholder="Search"
          className="mr-sm-2"
          onChange={handleChange}
        >
          <option value="MLA1053">MLA1053</option>
          <option value="MLA1054">MLA1054</option>
          <option value="MLA1055">MLA1055</option>
          <option value="MLA1056">MLA1056</option>
        </FormControl>
        <Button variant="outline-info" onClick={handleClick}>
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return { cart: state.shoppingCart.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    selectCategory: category => dispatch(selectCategory(category)),
    fetchProductsIfNeeded: category => dispatch(fetchProductsIfNeeded(category))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
