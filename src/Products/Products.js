import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { addItemToCart } from '../Actions';
import ItemProduct from './ItemProduct';

const Products = ({ isFetching, success, products, addItemToCart }) => {
  let children;

  if (isFetching)
    children = (
      <tr>
        <td colSpan="5" align="center">
          <Spinner animation="border" variant="primary" />
        </td>
      </tr>
    );

  if (success && products.length !== 0)
    children = products.map((product, index) => {
      return (
        <ItemProduct
          key={index}
          product={product}
          addItemToCart={() => addItemToCart(product.id)}
        />
      );
    });

  if (success && products.length === 0)
    children = (
      <tr>
        <td colSpan="5" align="center">
          No Items
        </td>
      </tr>
    );

  if (!success)
    children = (
      <tr>
        <td colSpan="5" align="center">
          Networ Error
        </td>
      </tr>
    );

  return (
    <div>
      <h1>Products</h1>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.shoppingCart.isFetching,
    success: state.shoppingCart.success,
    products: state.shoppingCart.products,
    cart: state.shoppingCart.cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => dispatch(addItemToCart(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
