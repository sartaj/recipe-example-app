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
import { Recipe } from "../recipe-queries/recipe-queries";
import { useSelector } from "../state-management-system";
import { IngredientsItemView } from "./components/ingredients-item.view";

const RecipeView: React.FC = () => {
  const itemsChecked = useSelector((state) => size(state.RecipeView.cartDraft));
  const recipe = useSelector(
    (state) => state.RecipesList.recipes[state.RecipesList.selectedRecipe]
  );

  const cartDraft = useSelector((state) => state.RecipeView.cartDraft);
  console.log(cartDraft);
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
                      ingredientIndex={i}
                      name={name}
                      value={value}
                      unit={unit}
                      selected={selected}
                      draftValue={cartDraft[i]?.value || 1}
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
            <Button>
              <Text>Add {itemsChecked} Ingredients To Cart</Text>
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
