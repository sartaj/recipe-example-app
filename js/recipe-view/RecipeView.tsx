import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  H1,
  H2,
  List,
  ListItem,
  View,
  Button,
} from "native-base";
import * as React from "react";
import { Recipe } from "../recipe-queries/recipe-queries";
import { IngredientsItemView } from "./components/IngredientsItemView";

const RecipeView: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const itemsChecked = false;
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
                  return (
                    <IngredientsItemView
                      key={i}
                      name={name}
                      value={value}
                      unit={unit}
                      last={i === recipe.ingredients.length - 1}
                    />
                  );
                })}
              </View>
            </CardItem>
          </Card>
        </CardItem>
        {itemsChecked && (
          <CardItem style={{ justifyContent: "center" }}>
            <Button>
              <Text>Add Ingredients To Cart</Text>
            </Button>
          </CardItem>
        )}
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
