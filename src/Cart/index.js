import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CustomRow from './CustomRow';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { connect } from 'react-redux';
import { deleteItemFromCart, buyCart } from '../Actions';

class Cart extends Component {
  render() {
    const { cart, deleteItemFromCart, buyCart } = this.props;
    let newCart = [];

    let total = cart.reduce(
      (prevTotal, nextElement) => prevTotal + nextElement.totalValue,
      0
    );

    return (
      <div>
        <h1>Cart</h1>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>Resume</Card.Header>
            <Card.Body>
              <Card.Title>Order</Card.Title>
              <Card.Text>Total value of ${total}</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  buyCart();
                  alert('Cart was Ordered');
                }}
                disabled={cart.length === 0}
              >
                Buy
              </Button>
            </Card.Body>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Detail
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  {!cart.length ? (
                    <p align="center">No Items</p>
                  ) : (
                    cart.map((element, index) => {
                      newCart.push(element);

                      if ((index + 1) % 3 === 0 || index + 1 === cart.length) {
                        let newCartRow = newCart;
                        newCart = [];
                        return (
                          <CustomRow
                            key={index}
                            items={newCartRow}
                            deleteItemFromCart={() =>
                              deleteItemFromCart(element.id)
                            }
                          />
                        );
                      }
                      return false;
                    })
                  )}
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { cart: state.cart };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItemFromCart: item => dispatch(deleteItemFromCart(item)),
    buyCart: () => dispatch(buyCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
