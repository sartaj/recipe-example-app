import { findIndex, pullAt } from "lodash/fp";
import { Reducer } from "redux";
import { Unit } from "../recipe-queries/recipe-queries";

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
      payload: {};
    }
  | {
      type: typeof CHECKOUT_CHANGE_GROCERY_STORE;
      payload: string;
    };

export interface CartStateItem {
  name: string;
  value: number;
  unit: Unit;
  count: number;
}

interface CartState {
  cart: CartStateItem[];
  groceryStore: string;
}

const defaultState = {
  cart: [],
  groceryStore: "",
};

const mergeCart = (cart1: CartStateItem[], cart2: CartStateItem[]) => {
  let updatedCart: CartStateItem[] = [...cart1];
  let updatedPayload: CartStateItem[] = [...cart2];
  updatedCart.forEach((cartItem, i) => {
    const payloadIndex = findIndex({ name: cartItem.name }, updatedPayload);
    // add to count if exists
    if (payloadIndex > -1) {
      updatedCart[i] = {
        ...cartItem,
        count: cartItem.count + updatedPayload[payloadIndex].count,
      };
      updatedPayload = pullAt(payloadIndex, updatedPayload);
    }
  });
  return [...updatedCart, ...updatedPayload];
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
    default:
      return state;
  }
};

export const register = { Checkout: reducer };
