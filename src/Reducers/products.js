import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice ({
    name:'products',
    initialState:{
        name:"",
        product_image:"",
        price:"",
        stock:"",
        categoryId:""
    },
    reducers:{
        showProducts: (state, action)=>{
            state.name = action.payload;
            state.product_image = action.payload;
            state.price = action.payload;
            state.stock = action.payload;
            state.categoryId = action.payload;
        }
    }

});

export const {showProducts} = productsSlice.actions;
export default productsSlice.reducer;

//ini gausa buat nyoba aja blajar