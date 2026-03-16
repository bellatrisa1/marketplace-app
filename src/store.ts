import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MarketplaceProduct } from "@/types/api";

interface CartItem extends MarketplaceProduct {
  cartQuantity: number;
}

interface StoreState {
  cartItems: CartItem[];
  favoriteIds: number[];

  addToCart: (product: MarketplaceProduct) => void;
  increaseCartItem: (id: number) => void;
  decreaseCartItem: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  toggleFavorite: (product: MarketplaceProduct) => void;
  isFavorite: (id: number) => boolean;

  getCartTotalPrice: () => number;
  getCartItemsCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      favoriteIds: [],

      addToCart: (product) =>
        set((state) => ({
          cartItems: [...state.cartItems, { ...product, cartQuantity: 1 }],
        })),

      increaseCartItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        })),

      decreaseCartItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? { ...item, cartQuantity: item.cartQuantity - 1 }
                : item
            )
            .filter((item) => item.cartQuantity > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),

      toggleFavorite: (product) => {
        const favorites = get().favoriteIds;

        if (favorites.includes(product.id)) {
          set({
            favoriteIds: favorites.filter((id) => id !== product.id),
          });
        } else {
          set({
            favoriteIds: [...favorites, product.id],
          });
        }
      },

      isFavorite: (id) => get().favoriteIds.includes(id),

      getCartTotalPrice: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.cartQuantity,
          0
        ),

      getCartItemsCount: () =>
        get().cartItems.reduce(
          (total, item) => total + item.cartQuantity,
          0
        ),
    }),
    {
      name: "orvix-storage",
    }
  )
);