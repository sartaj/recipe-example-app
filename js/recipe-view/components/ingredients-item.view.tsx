import {
  Body,
  CheckBox,
  Icon,
  Item,
  ListItem,
  Picker,
  Right,
  Text,
} from "native-base";
import * as React from "react";
import { Platform } from "react-native";
import { Unit } from "../../recipe-queries/recipe-queries";
import { useDispatch } from "../../state-management-system";
import {
  RECIPE_VIEW_CHANGE_CART_VALUE,
  RECIPE_VIEW_SELECT_INGREDIENT,
} from "../recipe.reducer";

interface IngredientItemProps {
  name: string;
  value: number;
  unit: Unit;
  last: boolean;
  selected: boolean;
  ingredientIndex: number;
  draftValue: number;
}

export const IngredientsItemView: React.FC<IngredientItemProps> = ({
  name,
  value,
  unit,
  last,
  selected,
  ingredientIndex,
  draftValue,
}) => {
  const dispatch = useDispatch();

  return (
    <ListItem
      style={[last ? { borderColor: "transparent" } : null, { flex: 1 }]}
    >
      <CheckBox
        checked={selected}
        onPress={() => {
          dispatch({
            type: RECIPE_VIEW_SELECT_INGREDIENT,
            payload: ingredientIndex,
          });
        }}
      />
      <Body>
        <Text>{name}</Text>
      </Body>
      <Right>
        {selected ? (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{
                width: Platform.OS === "ios" ? 70 : 100,
                marginRight: Platform.OS === "ios" ? 30 : undefined,
              }}
              selectedValue={String(draftValue)}
              onValueChange={(e) => {
                dispatch({
                  type: RECIPE_VIEW_CHANGE_CART_VALUE,
                  payload: {
                    itemIndex: ingredientIndex,
                    value: e,
                  },
                });
              }}
            >
              {Array.from(Array(10)).map((_, i) => (
                <Picker.Item
                  key={i}
                  label={String((i + 1) * value) + " " + unit}
                  value={String(i + 1)}
                />
              ))}
            </Picker>
          </Item>
        ) : (
          <Text>
            {value} {unit}
          </Text>
        )}
      </Right>
    </ListItem>
  );
};
