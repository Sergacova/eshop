import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface ProductState {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsState {
  products: ProductState[];
  total: number;
  skip: number;
  limit: number;
}

const initialProductsState: ProductState[] = [];

const initialState = {
  products: initialProductsState,
  total: 0,
  skip: 0,
  limit: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      const { products, total, skip, limit } = action.payload;
      state.products = products;
      state.total = total;
      state.skip = skip;
      state.limit = limit;
    },
    clearProducts: (state, action: PayloadAction) => {
      return initialState;
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addProduct, clearProducts, setProducts, deleteProduct } =
  productsSlice.actions;

export const getProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
