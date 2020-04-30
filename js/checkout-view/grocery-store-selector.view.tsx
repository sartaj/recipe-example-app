import { Icon, Item, Picker } from "native-base";
import * as React from "react";
import { useDispatch, useSelector } from "../state-management-system";
import { CHECKOUT_CHANGE_GROCERY_STORE } from "./checkout.reducer";

export const GroceryStoreSelector = () => {
  const selectedGroceryStore = useSelector(
    (state) => state.Checkout.selectedGroceryStore
  );

  const storeOptions = useSelector(
    (state) =>
      Object.keys(
        state.Checkout.groceryStorePrices
      ) as (keyof typeof state.Checkout.groceryStorePrices)[]
  );

  const dispatch = useDispatch();

  return (
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: 190 }}
        selectedValue={selectedGroceryStore}
        onValueChange={(e) => {
          dispatch({
            type: CHECKOUT_CHANGE_GROCERY_STORE,
            payload: e,
          });
        }}
      >
        {storeOptions.map((store) => (
          <Picker.Item key={store} label={store} value={store} />
        ))}
      </Picker>
    </Item>
  );
};

export default GroceryStoreSelector;
