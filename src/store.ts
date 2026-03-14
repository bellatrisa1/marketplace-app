import { create } from "zustand";
import type { MarketplaceProduct } from "@/types/api";

export interface CartItem extends MarketplaceProduct {
  cartQuantity: number;
}

interface StoreState {
  cartItems: CartItem[];
  favoriteIds: number[];

  addToCart: (product: MarketplaceProduct) => void;
  removeFromCart: (productId: number) => void;
  increaseCartItem: (productId: number) => void;
  decreaseCartItem: (productId: number) => void;
  clearCart: () => void;

  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  getCartItemsCount: () => number;
  getCartTotalPrice: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cartItems: [],
  favoriteIds: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item,
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, cartQuantity: 1 }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  increaseCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item,
      ),
    })),

  decreaseCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === productId
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item,
        )
        .filter((item) => item.cartQuantity > 0),
    })),

  clearCart: () => set({ cartItems: [] }),

  toggleFavorite: (productId) =>
    set((state) => {
      const exists = state.favoriteIds.includes(productId);

      return {
        favoriteIds: exists
          ? state.favoriteIds.filter((id) => id !== productId)
          : [...state.favoriteIds, productId],
      };
    }),

  isFavorite: (productId) => get().favoriteIds.includes(productId),

  getCartItemsCount: () =>
    get().cartItems.reduce((total, item) => total + item.cartQuantity, 0),

  getCartTotalPrice: () =>
    get().cartItems.reduce(
      (total, item) => total + item.price * item.cartQuantity,
      0,
    ),
}));
