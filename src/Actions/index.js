import { ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, BUY_CART } from './types';

export const addItemToCart = payload => dispatch => {
  dispatch(addToCart(payload));
};

export function addToCart(payload) {
  return {
    type: ADD_ITEM_TO_CART,
    payload
  };
}

export function buyCart(payload) {
  return {
    type: BUY_CART
  };
}

export const deleteItemFromCart = payload => dispatch => {
  dispatch(deleteFromCart(payload));
};

export function deleteFromCart(payload) {
  return {
    type: DELETE_ITEM_FROM_CART,
    payload
  };
}
