import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  ListItem,
  Right,
  Text,
  View,
  Item,
  Picker,
  Icon,
  Left,
  H2,
} from "native-base";
import * as React from "react";
import { useSelector, useDispatch } from "../state-management-system";
import { Platform } from "react-native";
import { CHECKOUT_CHANGE_ITEM_COUNT } from "./checkout.reducer";

export const CheckoutView = () => {
  const cart = useSelector((state) => state.Checkout.cart);
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
        <Card transparent={true}>
          <CardItem header>
            <H1>Checkout</H1>
          </CardItem>
          <CardItem>
            <Card>
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
                              style={{
                                // flex: 1,
                                width: 110,
                                marginRight:
                                  Platform.OS === "ios" ? 30 : undefined,
                              }}
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
                              {Array.from(Array(11)).map((_, i) => (
                                <Picker.Item
                                  key={i}
                                  label={
                                    i === 0
                                      ? "Remove"
                                      : String(i * value) + " " + unit
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
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default CheckoutView;
