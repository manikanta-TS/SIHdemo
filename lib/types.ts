export interface Artisan {
  id: string;
  name: string;
  village: string;
  state: string;
  craft: string;
  specialization: string;
  yearsExperience: number;
  story: string;
  image: string;
  rating: number;
  followers: number;
  productsCount: number;
  verified: boolean;
  languages: string[];
}

export interface Product {
  id: string;
  name: string;
  artisanId: string;
  artisanName: string;
  artisanState: string;
  category: string;
  craft: string;
  material: string;
  technique: string;
  color: string;
  region: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  tags: string[];
  dimensions: string;
  stock: number;
  estimatedDelivery: string;
  trending?: boolean;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: { productId: string; name: string; image: string; price: number; quantity: number; artisanName: string }[];
  total: number;
  date: string;
  status: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  address: string;
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface SellerOrder {
  id: string;
  product: string;
  productImage: string;
  customer: string;
  amount: number;
  date: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered';
}

export interface Notification {
  id: string;
  type: 'order' | 'product' | 'views' | 'price' | 'trend' | 'delivery' | 'collection';
  title: string;
  message: string;
  time: string;
  read: boolean;
  role: 'buyer' | 'seller';
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}
