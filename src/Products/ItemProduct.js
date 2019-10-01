import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ItemProduct = ({ product, addItemToCart }) => (
  <tr>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>$ {product.price}</td>
    <td>{product.stock} Unit(s)</td>
    <td>
      <Button onClick={addItemToCart} disabled={!(product.stock > 0)}>
        Add
      </Button>
    </td>
  </tr>
);

ItemProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  addItemToCart: PropTypes.func.isRequired
};

export default ItemProduct;
