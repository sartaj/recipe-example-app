export type Unit = "lbs" | "oz" | "tsp" | "cloves" | "cup" | "loaf";

export interface Recipe {
  name: string;
  image: string;
  ingredients: {
    name: string;
    value: number;
    unit: Unit;
  }[];
  steps: {
    description: string;
  }[];
}
