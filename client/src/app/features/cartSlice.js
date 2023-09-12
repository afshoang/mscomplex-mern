import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existedProductIndex = state.products.findIndex(item => item.product._id === action.payload.product._id)
            if (existedProductIndex !== -1) {
                state.products.splice(existedProductIndex,1)
            }
            state.products.push(action.payload)
        },
        changeQuantityItem: (state, action) => {
            const { productId, quantity } = action.payload
            const existedProductIndex = state.products.findIndex(item => item.product._id === productId)
            if (existedProductIndex !== -1) {
                state.products[existedProductIndex].quantity = quantity
            }
        },
        removeItem: (state, action) => {
            const { productId } = action.payload
            const existedProductIndex = state.products.findIndex(item => item.product._id === productId)
            if (existedProductIndex !== -1) {
                state.products.splice(existedProductIndex, 1)
            }
        },
        resetCart: (state, action) => {
            state.products = []
        }
    },
})

export const { addToCart, changeQuantityItem, removeItem, resetCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.products
export const selectCartQuantity = (state) => state.cart.products.reduce((acc, curr) => {
    return acc + curr.quantity
}, 0)
export const selectCartTotalPrice = (state) => state.cart.products.reduce((acc, curr) => {
    return acc + curr.quantity * curr.product.price
}, 0)

export default cartSlice.reducer
