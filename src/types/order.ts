export interface Address{
  city: string,
  state: string,
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  }
}
export interface PastDetailsProps {
  orders: {
    seller?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: Address[];
    };
    company?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: Address;
    };
    item?: {
      id: string,
      name: string;
      price: number;
      weight: number;
      image: string;
      category: string;
    };
    deliveryPerson?: {
      id: string,
      name: string;
      photo: string;
      contact: string;
      rating: number;
    };
    pickupTime?: {
      start: string;
      end: string;
    };
  };
}

export interface Order {
  order: {
    seller?: {
      id?: string,
      name?: string;
      image?: string;
      phone?: string;
      address?: Address[];
    };
    company?: {
      id?: string,
      name?: string;
      image?: string;
      phone?: string;
      address?: Address;
    };
    item?: {
      id: string,
      name?: string;
      price?: number;
      weight?: number;
      image?: string;
      category?: string;
    };
    deliveryPerson?: {
      id?: string,
      name?: string;
      photo?: string;
      contact?: string;
      rating?: number;
    };
    pickupTime?: {
      start?: string;
      end?: string;
    };
    chatId?: string;
  };
}


export interface sellGarbage {
  chatId: string;
  order: {
    seller?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: Address;
    };
    company?: {
      id: string,
      name: string;
      image: string;
      phone: string;
      address: Address;
    };
    itemName: string;
    status: string;
    image: string;
    weight: string;
    deliveryPerson?: {
      id: string,
      name: string;
      photo: string;
      contact: string;
      rating: number;
    };
    pickupTime?: {
      start: string;
      end: string;
    };
  };
}

