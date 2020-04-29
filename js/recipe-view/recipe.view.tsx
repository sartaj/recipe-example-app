import { StackActions, useNavigation } from "@react-navigation/native";
import { size } from "lodash/fp";
import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  H1,
  H2,
  ListItem,
  Text,
  View,
} from "native-base";
import * as React from "react";
import { CHECKOUT_ADD_TO_CART } from "../checkout-view/checkout.reducer";
import { useDispatch, useSelector } from "../state-management-system";
import { IngredientsItemView } from "./components/ingredients-item.view";
import { RECIPE_VIEW_CLEAR_DRAFT } from "./recipe.reducer";

const RecipeView: React.FC = () => {
  const navigation = useNavigation();
  const itemsChecked = useSelector((state) => size(state.RecipeView.cartDraft));
  const recipe = useSelector(
    (state) => state.RecipesList.recipes[state.RecipesList.selectedRecipe]
  );
  const cartDraft = useSelector((state) => state.RecipeView.cartDraft);
  const cartSize = useSelector((state) => state.Checkout.cart.length);
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
    <Content>
      <Card>
        <CardItem header>
          <H1>{recipe.name}</H1>
        </CardItem>
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
                    />
                  );
                })}
              </View>
            </CardItem>
          </Card>
        </CardItem>
        {itemsChecked ? (
          <CardItem style={{ justifyContent: "center" }}>
            <Button onPress={submitCart}>
              <Text>Add {itemsChecked} Ingredients To Cart</Text>
            </Button>
          </CardItem>
        ) : null}
        {cartSize > 0 && !itemsChecked ? (
          <CardItem style={{ justifyContent: "center" }}>
            <Button onPress={navigateToCheckout}>
              <Text>Checkout {cartSize} Ingredients</Text>
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
  );
};

export default RecipeView;
