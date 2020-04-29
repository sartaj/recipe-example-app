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
import { Unit } from "../graph-queries/types";
import { useDispatch } from "../state-management-system";
import {
  RECIPE_VIEW_CHANGE_CART_COUNT,
  RECIPE_VIEW_SELECT_INGREDIENT,
} from "./recipe.reducer";

interface IngredientItemProps {
  name: string;
  value: number;
  unit: Unit;
  last: boolean;
  selected: boolean;
  index: number;
  draftValue: number;
}

export const IngredientsItemView: React.FC<IngredientItemProps> = React.memo(
  ({ name, value, unit, last, selected, index, draftValue }) => {
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
              payload: {
                index,
                unit,
                name,
                value,
              },
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
                    type: RECIPE_VIEW_CHANGE_CART_COUNT,
                    payload: {
                      index,
                      count: e,
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
  }
);
