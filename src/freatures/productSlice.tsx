import React from "react";

import { createAsyncThunk,  } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { listProducts, addProducts, readProducts, removeProducts, updateProducts,NamePro,productCate } from "../Api/products";
import { ProductType } from "../Types/ProductsType";


export const listProduct = createAsyncThunk( 'products/listProduct' , async () => {
    const data = await listProducts();
    return data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (params: ProductType) => {
    const data = await addProducts(params);
    return data;
})
export const removeProduct = createAsyncThunk('products/removeProduct', async (params: ProductType) => {
    const data = await removeProducts(params);
    return data;
})

export const updateProduct = createAsyncThunk('products/updateProduct', async (params: ProductType) => {
    const data = await updateProducts(params);
    return data;
})

export const readProduct = createAsyncThunk('products/readProduct', async (params: ProductType) => {
    const data = await readProducts(params);
    return data;
})

export const productCates =createAsyncThunk(
    'products/productCates', async (params: ProductType ) => {
      const {data} = await productCate(params);
      return data;
    }
  );
  
  export const namesProduct =createAsyncThunk(
    'products/namesProduct', async (params: ProductType ) => {
      const {data} = await NamePro(params);
      return data;
    }
  );
const productSlice = createSlice({
    name: "products",
    initialState: {
        value: [],
        loading: true,
        error: "",
    },
    reducers: {

    },
    extraReducers: {
        [listProduct.pending]: (state, action) => {
            state.loading = true
        },
        [listProduct.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
        [listProduct.fulfilled]: (state, action) => {
            state.loading = false
            state.value = action.payload;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.value.push(action.payload)
        },
        [removeProduct.fulfilled]: (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload._id)
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.value = state.value.map(item => item._id === action.payload._id ? action.payload : item)
        },
        [productCates.fulfilled]: (state, action) => {
            state.value = action.payload;
        },
        [namesProduct.fulfilled]: (state, action) => {
              state.value = action.payload;
        },
    }   
});
export default productSlice.reducer

