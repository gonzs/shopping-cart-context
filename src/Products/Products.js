import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { addItemToCart } from '../Actions';
import ItemProduct from './ItemProduct';

const Products = ({ products, addItemToCart }) => (
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
        {products.length === 0 ? (
          <tr>
            <td colSpan="5" align="center">
              <Spinner animation="border" variant="primary" />
            </td>
          </tr>
        ) : (
          products.map((product, index) => {
            return (
              <ItemProduct
                key={index}
                product={product}
                addItemToCart={() => addItemToCart(product.id)}
              />
            );
          })
        )}
      </tbody>
    </Table>
  </div>
);

const mapStateToProps = state => {
  return { products: state.products, cart: state.cart };
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
