import React from 'react';
import Button from 'react-bootstrap/Button';

const ItemProduct = ({ product, addItemToCart }) => (
  <tr>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>${product.price}</td>
    <td>{product.stock} Unit(s)</td>
    <td>
      <Button onClick={addItemToCart} disabled={!(product.stock > 0)}>
        Add
      </Button>
    </td>
  </tr>
);
export default ItemProduct;
