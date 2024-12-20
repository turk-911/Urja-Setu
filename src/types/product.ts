export interface Product {
    id: string;
    title: string;
    price: number;
    condition: string;
    seller: string;
    liked: boolean;
    rating: number;
    images: string[];
    category: string;
    description?: string;
    features?: string[];
    reviews?: Review[];
    discount?: number;
  }

  export interface cartProduct extends Product{ quantity: number }
  
  export interface ShippingOption {
    id: string;
    name: string;
    price: number;
}

  export interface Review {
    id: string;
    name: string;
    photoURL: string;
    rating: number;
    comment: string;
    date: string;
  }