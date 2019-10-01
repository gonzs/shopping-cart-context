import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const LineCart = ({ items, deleteItemFromCart }) => (
  <Fragment>
    <Row>
      {items.map((item, index) => {
        return (
          <Col key={index} xs={12} sm={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.quantity} Unit(s)</Card.Text>
                <Card.Text>Total of: ${item.totalValue}</Card.Text>
                <Button variant="danger" onClick={deleteItemFromCart}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  </Fragment>
);

LineCart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      totalValue: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  deleteItemFromCart: PropTypes.func.isRequired
};

export default LineCart;
