// In App.js in a new project

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";
import * as React from "react";
import { Recipe } from "../recipe-queries/recipe-queries";

const RecipeView: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Container>
      <Content>
        <Card>
          <CardItem header>
            <Text>{recipe.name}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Ingredients</Text>
              {Object.keys(recipe.ingredients).map((i) => {
                const { value, unit } = recipe.ingredients[i];
                return (
                  <Text key={i}>
                    {i}: {value} {unit}
                  </Text>
                );
              }, recipe.ingredients)}
              <Text>Steps</Text>
              {recipe.steps.map(({ description }, i) => {
                return <Text key={i}>{description}</Text>;
              })}
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Buy Ingredients For This</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default RecipeView;
