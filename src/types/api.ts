export interface ProductApiItem {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images?: string[];
}

export interface ProductsResponse {
  products: ProductApiItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface MarketplaceProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}