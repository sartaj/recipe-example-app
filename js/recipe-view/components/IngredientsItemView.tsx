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
import { Recipe } from "../../recipe-queries/recipe-queries";

interface IngredientItemProps {
  ingredient: string;
  value: number;
  unit: Recipe["ingredients"]["unit"];
}

export const IngredientsItemView: React.FC<IngredientItemProps> = ({
  ingredient,
  value,
  unit,
}) => {
  return (
    <Text>
      {ingredient}: {value} {unit}
    </Text>
  );
};
