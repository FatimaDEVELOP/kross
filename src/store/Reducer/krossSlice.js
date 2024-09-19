import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getShop = createAsyncThunk("shop/getShop", async () => {
  let response = await axios.get("http://localhost:3000/cross");
  return response.data;
});
export const getBasket = createAsyncThunk("shop/getBasket", async () => {
  let response = await axios.get("http://localhost:3000/basket");
  return response.data;
});

export const addBasket = createAsyncThunk("shop/addBasket", async (el) => {
  let response = await axios.post("http://localhost:3000/basket", el);
  return response.data;
});

export const removeBasket = createAsyncThunk(
  "cross/removeBasket",
  async (item) => {
    await axios.delete(`${"http://localhost:3000/basket"}/${item}`);
    return item;
  }
);

export const krossSlice = createSlice({
  name: "shop",
  initialState: {
    data: [],
    loading: false,
    error: null,
    basket: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShop.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getBasket.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = action.payload;
      })
      .addCase(getBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket.push(action.payload);
      })
      .addCase(addBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.basket = state.basket.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default krossSlice.reducer;
