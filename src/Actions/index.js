import {
  LOAD_PRODUCTS,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  BUY_CART
} from './types';

export const loadProductsAsync = payload => dispatch => {
  fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA1055')
    .then(response => response.json())
    .then(data => {
      let products = data.results.map((item, index) => {
        return {
          id: item.id,
          name: item.title,
          price: item.price,
          stock: item.available_quantity,
          image: item.thumbnail
        };
      });
      dispatch(loadProducts(products));
    });
};

export function loadProducts(payload) {
  return {
    type: LOAD_PRODUCTS,
    payload
  };
}

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
