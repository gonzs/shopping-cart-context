import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { addItemToCart } from '../Actions';
import ItemProduct from './ItemProduct';

const Products = ({ isFetching, success, products, addItemToCart }) => (
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
      <tbody>
        {isFetching ? (
          <tr>
            <td colSpan="5" align="center">
              <Spinner animation="border" variant="primary" />
            </td>
          </tr>
        ) : success ? (
          products.map((product, index) => {
            return (
              <ItemProduct
                key={index}
                product={product}
                addItemToCart={() => addItemToCart(product.id)}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan="5" align="center">
              No Products
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
);

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
