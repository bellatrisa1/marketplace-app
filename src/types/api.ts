export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal?: number;
  discountedPrice?: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface MarketplaceProduct {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  discountPercentage: number;
  thumbnail: string;
  quantity: number;
}
