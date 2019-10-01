import {
  LOAD_PRODUCTS,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  BUY_CART
} from '../Actions/types';

const initialState = { products: [], cart: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let newProducts = action.payload;
      return {
        ...state,
        products: newProducts
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
export default rootReducer;
