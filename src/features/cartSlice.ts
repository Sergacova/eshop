import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { ProductState } from "./productsSlice";


export interface CardProductState extends ProductState {
    quantity: number;
    id: number;
    price: number;
    discountPercentage: number;



}

export interface CartState {
    products: CardProductState[];
    totalPrice: number;
    totalDiscountPrice: number;
    totalQuantity: number;
    hasDiscount: boolean;
}

const initialState: CartState = {
    products: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
    totalQuantity: 0,
    hasDiscount: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<CardProductState>) => {
            const currentProduct = state.products.find(
                (item: ProductState) => item.id === action.payload.id
            );

            if (currentProduct === undefined) {
                state.products.push(action.payload);
            } else {
                currentProduct.quantity += action.payload.quantity;
            }

            const totalPrice = action.payload.price * action.payload.quantity;
            const discount = (totalPrice * action.payload.discountPercentage) / 100;

            state.totalPrice += totalPrice;
            state.totalDiscountPrice += totalPrice - discount;
            state.totalQuantity += action.payload.quantity;
        },
        deleteFromCart: (
            state: CartState,
            action: PayloadAction<CardProductState>
        ) => {
            const deletedProduct = state.products.find(
                (product) => product.id === action.payload.id
            );

            if (deletedProduct !== undefined) {
                if (action.payload.quantity < deletedProduct.quantity) {
                    deletedProduct.quantity -= action.payload.quantity;
                } else {
                    state.products = state.products.filter(
                        (product) => product.id !== action.payload.id
                    );
                }
                const totalPrice = deletedProduct.price * action.payload.quantity;
                const discount = (totalPrice * action.payload.discountPercentage) / 100;

                state.totalPrice -= totalPrice;
                state.totalDiscountPrice -= totalPrice - discount;
                state.totalQuantity -= action.payload.quantity;
            }
        },
        setCart: (state: CartState, action: PayloadAction<CartState>) => {
            return action.payload;
        },
        clearCart: (state: CartState, action: PayloadAction) => {
            return initialState;
        },
        setDiscount: (state: CartState, action: PayloadAction<string>) => {
            state.hasDiscount = action.payload === "discount";
        },
    },
});

export const { addToCart, deleteFromCart, setCart, clearCart, setDiscount } =
    cartSlice.actions;

export const getCart = (state: RootState) => state.cart;

export default cartSlice.reducer;