import React from 'react'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0
    },
    reducers : {
        addItem: (state, action ) => {
            const newItem = action.payload;
            const existItem = state.items.find((item) => item._id === newItem._id );
            if(!existItem){
                state.items.push(newItem);
            }else{
                existItem.quantity += action.payload.quantity;
            }
        },
        getTotalItems : (state,action) => {
            let total = 0;
            for (let i= 0 ;i<state.items.length;i++ ) {
                total +=state.items[i].price * state.items[i].quantity
            };
            state.total = total;
        },
        removeItem: (state, action: PayloadAction) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        }
    }
})
export const { addItem, removeItem,getTotalItems} = cartSlice.actions
export default cartSlice.reducer