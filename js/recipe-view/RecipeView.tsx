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
          <Body>
            <H2>Ingredients</H2>
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
            <H2>Steps</H2>
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
  );
};

export default RecipeView;
