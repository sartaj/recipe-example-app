import { findIndex, pullAt, remove } from "lodash/fp";
import { Reducer } from "redux";
import { Unit } from "../graph-queries/types";
import {
  groceryStorePrices,
  defaultGroceryStore,
} from "../graph-queries/graphq-queries";

export const CHECKOUT_ADD_TO_CART = "CHECKOUT_ADD_TO_CART";
export const CHECKOUT_CHANGE_GROCERY_STORE = "CHECKOUT_CHANGE_GROCERY_STORE";
export const CHECKOUT_CHANGE_ITEM_COUNT = "CHECKOUT_CHANGE_ITEM_COUNT";

type CheckoutActions =
  | {
      type: typeof CHECKOUT_ADD_TO_CART;
      payload: CartStateItem[];
    }
  | {
      type: typeof CHECKOUT_CHANGE_ITEM_COUNT;
      payload: {
        index: number;
        count: number;
      };
    }
  | {
      type: typeof CHECKOUT_CHANGE_GROCERY_STORE;
      payload: keyof typeof groceryStorePrices;
    };

export interface CartStateItem {
  name: string;
  value: number;
  unit: Unit;
  count: number;
}

interface CartState {
  cart: CartStateItem[];
  selectedGroceryStore: keyof typeof groceryStorePrices;
  groceryStorePrices: typeof groceryStorePrices;
}

const mergeCart = (cart1: CartStateItem[], cart2: CartStateItem[]) => {
  let updatedCart = [...cart1];
  let updatedPayload = [...cart2];
  updatedCart.forEach((cartItem, i) => {
    const payloadIndex = findIndex({ name: cartItem.name }, updatedPayload);
    // add to count if exists
    if (payloadIndex > -1) {
      updatedCart[i] = {
        ...cartItem,
        count: cartItem.count + Number(updatedPayload[payloadIndex].count),
      };
      updatedPayload = pullAt(payloadIndex, updatedPayload);
    }
  });
  return [...updatedCart, ...updatedPayload];
};

const defaultState = {
  cart: [],
  selectedGroceryStore: defaultGroceryStore as keyof typeof groceryStorePrices,
  groceryStorePrices,
};
const reducer: Reducer<CartState, CheckoutActions> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case CHECKOUT_ADD_TO_CART:
      return {
        ...state,
        cart: mergeCart(state.cart, action.payload),
      };
    case CHECKOUT_CHANGE_ITEM_COUNT:
      let newCart = [...state.cart];
      if (action.payload.count > 0) {
        newCart[action.payload.index] = {
          ...state.cart[action.payload.index],
          count: Number(action.payload.count),
        };
      } else {
        newCart.splice(action.payload.index, 1);
      }
      return {
        ...state,
        cart: newCart,
      };
    case CHECKOUT_CHANGE_GROCERY_STORE:
      return {
        ...state,
        selectedGroceryStore: action.payload,
      };
    default:
      return state;
  }
};

export const register = { Checkout: reducer };
