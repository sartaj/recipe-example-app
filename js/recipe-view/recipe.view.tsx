import { StackActions, useNavigation } from "@react-navigation/native";
import { size } from "lodash/fp";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  H1,
  H2,
  Icon,
  ListItem,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { Image } from "react-native";
import { CHECKOUT_ADD_TO_CART } from "../checkout-view/checkout.reducer";
import GroceryStoreSelector from "../checkout-view/grocery-store-selector.view";
import { useDispatch, useSelector } from "../state-management-system";
import { IngredientsItemView } from "./ingredients-item.view";
import { RECIPE_VIEW_CLEAR_DRAFT } from "./recipe.reducer";

const RecipeView: React.FC = () => {
  const navigation = useNavigation();
  const itemsChecked = useSelector((state) => size(state.RecipeView.cartDraft));
  const recipe = useSelector(
    (state) => state.RecipesList.recipes[state.RecipesList.selectedRecipe]
  );
  const cartDraft = useSelector((state) => state.RecipeView.cartDraft);
  const cartSize = useSelector((state) => state.Checkout.cart.length);

  const prices = useSelector(
    (state) =>
      state.Checkout.groceryStorePrices[state.Checkout.selectedGroceryStore]
        .prices
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    navigation.setOptions({ title: recipe.name });
  }, [recipe.name]);

  const submitCart = () => {
    const cartStateItems = Object.values(cartDraft);
    dispatch({
      type: CHECKOUT_ADD_TO_CART,
      payload: cartStateItems,
    });
    dispatch({
      type: RECIPE_VIEW_CLEAR_DRAFT,
    });
  };

  const navigateToCheckout = () => {
    navigation.dispatch(StackActions.push("Checkout"));
  };

  return (
    <Container>
      <Content>
        <Image
          style={{ height: 200, flex: 1, opacity: 1 }}
          source={{
            uri: recipe.image,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            height: 200,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            padding: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textShadowColor: "rgba(0, 0, 0, 0.6)",
              textShadowOffset: { width: -1, height: 1 },
              textShadowRadius: 2,
              fontWeight: "700",
              fontSize: 40,
            }}
          >
            {recipe.name.toUpperCase()}
          </Text>
        </View>

        <Card transparent={true}>
          <CardItem header></CardItem>
          <CardItem>
            <H2>Ingredients</H2>
          </CardItem>
          <CardItem>
            <Card>
              <CardItem>
                <View style={{ width: "100%", flexDirection: "column" }}>
                  {recipe.ingredients.map(({ name, value, unit }, i) => {
                    const selected = Boolean(cartDraft[i]);
                    return (
                      <IngredientsItemView
                        key={i}
                        index={i}
                        name={name}
                        value={value}
                        unit={unit}
                        selected={selected}
                        draftValue={cartDraft[i]?.count || 1}
                        last={i === recipe.ingredients.length - 1}
                        unitPrice={prices[name]}
                      />
                    );
                  })}
                </View>
              </CardItem>
            </Card>
          </CardItem>
          {itemsChecked ? (
            <CardItem
              style={{ justifyContent: "center", flexDirection: "row" }}
            >
              <View style={{ marginHorizontal: 20 }}>
                <GroceryStoreSelector />
              </View>

              <Button onPress={submitCart}>
                <Text>Add {itemsChecked} To Cart</Text>
              </Button>
            </CardItem>
          ) : null}
          {cartSize > 0 && !itemsChecked ? (
            <CardItem style={{ justifyContent: "center" }}>
              <Button iconLeft onPress={navigateToCheckout}>
                <Icon name="md-cart" />
                <Text>Checkout ({cartSize})</Text>
              </Button>
            </CardItem>
          ) : null}
          <CardItem>
            <H2>Steps</H2>
          </CardItem>
          <CardItem>
            <Card>
              <CardItem>
                <View style={{ width: "100%", flexDirection: "column" }}>
                  {recipe.steps.map(({ description }, i) => {
                    return (
                      <ListItem
                        noIndent
                        key={i}
                        style={[
                          i === recipe.steps.length - 1
                            ? { borderColor: "white" }
                            : null,
                        ]}
                      >
                        <Text>{i + 1}</Text>
                        <Body>
                          <Text>{description}</Text>
                        </Body>
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

export default RecipeView;
