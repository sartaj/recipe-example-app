import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  H2,
  H3,
  Icon,
  Item,
  ListItem,
  Picker,
  Right,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { useDispatch, useSelector } from "../state-management-system";
import { CHECKOUT_CHANGE_ITEM_COUNT } from "./checkout.reducer";
import GroceryStoreSelector from "./grocery-store-selector.view";

export const CheckoutView = () => {
  const cart = useSelector((state) => state.Checkout.cart);
  console.log(cart);
  const prices = useSelector(
    (state) =>
      state.Checkout.groceryStorePrices[state.Checkout.selectedGroceryStore]
  );

  const priceTotal = useSelector((state) =>
    state.Checkout.cart
      .reduce(
        (acc, next) =>
          acc +
          next.count *
            state.Checkout.groceryStorePrices[
              state.Checkout.selectedGroceryStore
            ][next.name],
        0
      )
      .toFixed(2)
  );

  const dispatch = useDispatch();
  if (cart.length === 0) {
    return (
      <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <H2>No Items In Your Cart</H2>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Card>
          <CardItem header>
            <H1>Checkout</H1>
          </CardItem>
          <CardItem>
            <View style={{ width: "100%", flexDirection: "column" }}>
              {cart.map(({ name, value, unit, count }, index) => {
                return (
                  <ListItem
                    key={index}
                    style={[
                      index === cart.length - 1
                        ? { borderColor: "transparent" }
                        : null,
                      {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Icon
                      name="close"
                      onPress={() => {
                        dispatch({
                          type: CHECKOUT_CHANGE_ITEM_COUNT,
                          payload: {
                            index,
                            count: 0,
                          },
                        });
                      }}
                    ></Icon>
                    <Body>
                      <Text>{name}</Text>
                    </Body>
                    <Right>
                      <Item picker>
                        <Picker
                          mode="dropdown"
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: 190 }}
                          selectedValue={String(count)}
                          onValueChange={(e) => {
                            dispatch({
                              type: CHECKOUT_CHANGE_ITEM_COUNT,
                              payload: {
                                index,
                                count: e,
                              },
                            });
                          }}
                        >
                          {Array.from(Array(110)).map((_, i) => (
                            <Picker.Item
                              key={i}
                              label={
                                i === 0
                                  ? "Remove"
                                  : `${String(i * value)} ${unit} ($${(
                                      prices[name] * i
                                    ).toFixed(2)})`
                              }
                              value={String(i)}
                            />
                          ))}
                        </Picker>
                      </Item>
                    </Right>
                  </ListItem>
                );
              })}
            </View>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem style={{ justifyContent: "flex-end", marginRight: 20 }}>
            <Body>
              <GroceryStoreSelector />
            </Body>
            <Right>
              <H3>Total: {priceTotal}</H3>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default CheckoutView;
