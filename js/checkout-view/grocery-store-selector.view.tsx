import { Icon, Item, Picker, Text, View } from "native-base";
import * as React from "react";
import { useDispatch, useSelector } from "../state-management-system";
import { CHECKOUT_CHANGE_GROCERY_STORE } from "./checkout.reducer";

export const GroceryStoreSelector = () => {
  const selectedGroceryStore = useSelector(
    (state) => state.Checkout.selectedGroceryStore
  );

  const deliveryTime = useSelector(
    (state) =>
      state.Checkout.groceryStorePrices[state.Checkout.selectedGroceryStore]
        .deliveryTime
  );

  const storeOptions = useSelector(
    (state) =>
      Object.keys(
        state.Checkout.groceryStorePrices
      ) as (keyof typeof state.Checkout.groceryStorePrices)[]
  );

  const dispatch = useDispatch();

  return (
    <View style={{ flexDirection: "column" }}>
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
      <View style={{ paddingTop: 4 }}>
        <Text>Delivery Estimate: {deliveryTime}</Text>
      </View>
    </View>
  );
};

export default GroceryStoreSelector;
