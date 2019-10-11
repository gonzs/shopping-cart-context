import {
  SELECT_CATEGORY,
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS_OK,
  RECEIVE_PRODUCTS_ERROR,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  BUY_CART
} from '../Actions/types';
import { combineReducers } from 'redux';

function selectCategory(state = 'MLA1053', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.payload;

    default:
      return state;
  }
}

function shoppingCart(
  state = {
    isFetching: false,
    success: true,
    error: '',
    products: [],
    cart: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_PRODUCTS_OK:
      return {
        ...state,
        isFetching: false,
        success: true,
        products: action.payload
      };

    case RECEIVE_PRODUCTS_ERROR:
      console.log(action.payload.toString());
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.payload.toString()
      };

    case ADD_ITEM_TO_CART:
      let productAdded = state.products.find(
        item => item.id === action.payload
      );
      let existed_item = state.cart.find(item => item.id === action.payload);

      let itemAdded = {
        id: productAdded.id,
        name: productAdded.name,
        quantity: 0,
        totalValue: productAdded.price,
        image: productAdded.image
      };

      if (existed_item) {
        let updatedProducts = state.products.map(e => {
          if (e.id === action.payload) {
            e.stock -= 1;
            return e;
          }
          return e;
        });

        let updatedCart = state.cart.map(e => {
          if (e.id === productAdded.id) {
            e.quantity += 1;
            e.totalValue = e.totalValue + productAdded.price;
            return e;
          }
          return e;
        });

        return {
          ...state,
          products: updatedProducts,
          cart: updatedCart
        };
      } else {
        itemAdded.quantity = 1;

        return {
          ...state,
          cart: [...state.cart, itemAdded],
          products: state.products.map(e => {
            if (e.id === action.payload) {
              e.stock -= 1;
              return e;
            }
            return e;
          })
        };
      }

    case DELETE_ITEM_FROM_CART:
      let quantityDeleted = state.cart.find(item => item.id === action.payload)
        .quantity;

      let updatedProducts = state.products.map(e => {
        if (e.id === action.payload) {
          e.stock += quantityDeleted;
          return e;
        }
        return e;
      });

      return {
        ...state,
        cart: state.cart.filter(e => e.id !== action.payload),
        products: updatedProducts
      };

    case BUY_CART:
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

export default combineReducers({
  selectCategory,
  shoppingCart
});
