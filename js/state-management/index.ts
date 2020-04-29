import {
  Reducer,
  combineReducers,
  createStore as reduxCreateStore,
} from "redux";

import * as checkout from "../checkout/checkout.reducer";
import * as recipeView from "../recipe-view/recipe.reducer";

export type ReducerRegistry = [string, Reducer];

const allReducers: ReducerRegistry[] = [checkout.register, recipeView.register];

const reducerRegistry: { [s: string]: Reducer } = {};

// Probably in the future use the ability to replace reducers to allow async adding of reducers
export const registerReducer = (name: string, reducer: Reducer) => {
  reducerRegistry[name] = reducer;
};

export const createStore = () => {
  allReducers.forEach((reduceregistry: ReducerRegistry) => {
    registerReducer(...reduceregistry);
  });
  return reduxCreateStore(combineReducers(reducerRegistry));
};
