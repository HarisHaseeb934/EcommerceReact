import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./Cart/cartSlice"
import favouritesReducer from "./Favourites/favouritesSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourites: favouritesReducer,
    },
})
