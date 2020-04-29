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
              <Button>
                <Text>Add Ingredients To Cart</Text>
              </Button>
            </CardItem>
            <CardItem>
              <View style={{ width: "100%", flexDirection: "column" }}>
                {Object.keys(recipe.ingredients).map((i) => {
                  const { value, unit } = recipe.ingredients[i];
                  return (
                    <IngredientsItemView
                      key={i}
                      ingredient={i}
                      value={value}
                      unit={(unit as unknown) as Recipe["ingredients"]["unit"]} // unclear why ts is failing on this
                    />
                  );
                }, recipe.ingredients)}
              </View>
            </CardItem>
          </Card>
        </CardItem>
        <CardItem>
          <H2>Steps</H2>
        </CardItem>
        <CardItem>
          <Card>
            <CardItem>
              <View style={{ width: "100%", flexDirection: "column" }}>
                {recipe.steps.map(({ description }, i) => {
                  return (
                    <ListItem noIndent key={i}>
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
