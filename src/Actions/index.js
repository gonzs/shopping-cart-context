import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS_OK,
  RECEIVE_PRODUCTS_ERROR,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  BUY_CART,
  SELECT_CATEGORY
} from './types';

const fetchProducts = payload => dispatch => {
  dispatch(requestProducts());

  fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${payload}`)
    .then(response => {
      if (response.ok !== true) throw new Error(response.status);
      else return response.json();
    })
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
      dispatch(receiveProductsSuccess(products));
    })
    .catch(error => {
      console.log('An error occurred.', error);
      dispatch(receiveProductsFailure(error));
    });
};

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS
  };
}

export function receiveProductsSuccess(payload) {
  return {
    type: RECEIVE_PRODUCTS_OK,
    payload
  };
}
export function receiveProductsFailure(payload) {
  return {
    type: RECEIVE_PRODUCTS_ERROR,
    payload
  };
}

export function addItemToCart(payload) {
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

export function deleteItemFromCart(payload) {
  return {
    type: DELETE_ITEM_FROM_CART,
    payload
  };
}

export function selectCategory(payload) {
  return {
    type: SELECT_CATEGORY,
    payload
  };
}

function shouldFetchProducts(state, category) {
  const products = state.products;

  if (!products) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function fetchProductsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchProducts(getState(), category)) {
      return dispatch(fetchProducts(category));
    }
  };
}
