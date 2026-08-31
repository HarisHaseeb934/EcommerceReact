import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouritesProducts: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites(state, action) {
      return { ...state, favouritesProducts: [...state.favouritesProducts, action.payload] };
    },
    removeFromFavourites(state, action) {
      return {
        ...state,
        favouritesProducts: state.favouritesProducts.filter(
          (product) => product.id !== action.payload.id,
        ),
      };
    },
  },
});

export const {addToFavourites, removeFromFavourites} = favouritesSlice.actions;

export default favouritesSlice.reducer;