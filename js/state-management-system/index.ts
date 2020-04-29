import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";
import {
  createStore as reduxCreateStore,
  combineReducers as reduxCombineReducers,
} from "redux";

import { allReducers } from "./all-reducers";

export const combineReducers = (r: typeof allReducers) =>
  reduxCombineReducers(r);

export const createStore = () => reduxCreateStore(combineReducers(allReducers));

export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
export const useDispatch: () => AppDispatch = useReduxDispatch;

export type RootState = ReturnType<ReturnType<typeof combineReducers>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
