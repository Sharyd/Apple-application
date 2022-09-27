import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
// import type { RootState } from "./store/store";

// Define a type for the slice state
interface BasketState {
  items: Product[];
}

// Define the initial state using that type
const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (
      state: BasketState,
      action: PayloadAction<{ id: string }>
    ) => {
      const existingItemIndex = state.items.findIndex(
        (item: Product) => item._id === action.payload.id
      );
      let newBasket = [...state.items];

      if (existingItemIndex >= 0) {
        newBasket.splice(existingItemIndex, 1);
      } else {
        console.log(
          `Cant remove product id:${action.payload.id} as its not in basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectedBasketItems = (state: RootState) => state.basket.items;
export const selectBasketItemsWithId = (state: RootState, id: string) => {
  state.basket.items.filter((item: Product) => item._id === id);
};
export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: Product) => (total += item.price),
    0
  );
export default basketSlice.reducer;
