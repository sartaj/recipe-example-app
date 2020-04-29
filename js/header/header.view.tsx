import { StackActions, useNavigation } from "@react-navigation/native";
import { Icon, Text, View } from "native-base";
import * as React from "react";
import { useSelector } from "../state-management-system";

export const HeaderRight: React.FC = () => {
  const navigation = useNavigation();
  const cartSize = useSelector((state) => state.Checkout.cart.length);
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
    >
      <Icon
        onPress={() => {
          navigation.dispatch(StackActions.push("Checkout"));
        }}
        name="md-cart"
      />
      <Text>{cartSize}</Text>
    </View>
  );
};
