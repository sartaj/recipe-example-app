import { Reducer } from "redux";
import { ReducerRegistry } from "../state-management";

const defaultState = {};
const reducer: Reducer = (state = defaultState, action) => {
  return state;
};

export const register: ReducerRegistry = ["Checkout", reducer];
