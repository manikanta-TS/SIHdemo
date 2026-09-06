'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, Order, Notification, Product } from './types';
import { products as allProducts, sellerNotifications, buyerNotifications } from './mock-data';

interface AppState {
  role: 'buyer' | 'seller' | null;
  setRole: (r: 'buyer' | 'seller' | null) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  language: string;
  setLanguage: (l: string) => void;
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  sellerProducts: Product[];
  addSellerProduct: (p: Product) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<'buyer' | 'seller' | null>(null);
  const [isAuthenticated, setAuth] = useState(false);
  const [language, setLanguageState] = useState('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('hastkala-auth');
      if (savedAuth === 'true') setAuth(true);
      const savedRole = localStorage.getItem('hastkala-role');
      if (savedRole === 'buyer' || savedRole === 'seller') setRoleState(savedRole);
      const savedLang = localStorage.getItem('hastkala-lang');
      if (savedLang) setLanguageState(savedLang);
      const savedCart = localStorage.getItem('hastkala-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('hastkala-wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedOrders = localStorage.getItem('hastkala-orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      const savedProducts = localStorage.getItem('hastkala-seller-products');
      if (savedProducts) setSellerProducts(JSON.parse(savedProducts));
    } catch {}
  }, []);

  const setRole = useCallback((r: 'buyer' | 'seller' | null) => {
    setRoleState(r);
    if (r) {
      localStorage.setItem('hastkala-role', r);
      setNotifications(r === 'seller' ? sellerNotifications : buyerNotifications);
    } else {
      localStorage.removeItem('hastkala-role');
    }
  }, []);

  const login = useCallback(() => {
    setAuth(true);
    localStorage.setItem('hastkala-auth', 'true');
  }, []);

  const logout = useCallback(() => {
    setAuth(false);
    setRoleState(null);
    localStorage.removeItem('hastkala-auth');
    localStorage.removeItem('hastkala-role');
  }, []);

  const setLanguage = useCallback((l: string) => {
    setLanguageState(l);
    localStorage.setItem('hastkala-lang', l);
  }, []);

  const persistCart = (c: CartItem[]) => {
    setCart(c);
    localStorage.setItem('hastkala-cart', JSON.stringify(c));
  };

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      const next = existing
        ? prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + qty } : i))
        : [...prev, { productId, quantity: qty }];
      localStorage.setItem('hastkala-cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      localStorage.setItem('hastkala-cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateCartQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => {
      const next = prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
      localStorage.setItem('hastkala-cart', JSON.stringify(next));
      return next;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    persistCart([]);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('hastkala-wishlist', JSON.stringify(next));
      return next;
    });
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      localStorage.setItem('hastkala-orders', JSON.stringify(next));
      return next;
    });
  }, []);

  const addSellerProduct = useCallback((p: Product) => {
    setSellerProducts((prev) => {
      const next = [p, ...prev];
      localStorage.setItem('hastkala-seller-products', JSON.stringify(next));
      return next;
    });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = [...allProducts, ...sellerProducts].find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartCount,
        cartTotal,
        wishlist,
        toggleWishlist,
        orders,
        addOrder,
        sellerProducts,
        addSellerProduct,
        notifications,
        markNotificationRead,
        markAllRead,
        unreadCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
