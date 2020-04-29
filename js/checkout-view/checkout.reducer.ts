import { Reducer, Action } from "redux";

type CheckoutActions = {
  type: "CHECKOUT";
};

const defaultState = {};
const reducer: Reducer<typeof defaultState, CheckoutActions> = (
  state = defaultState,
  action
) => {
  return state;
};

export const register = { Checkout: reducer };
