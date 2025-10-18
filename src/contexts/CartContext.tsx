import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Artwork {
  id: string;
  title: string;
  titleRu: string;
  titleUz: string;
  description: string;
  descriptionRu: string;
  descriptionUz: string;
  category: 'oil' | 'watercolor' | 'digital' | 'mixed';
  price: number;
  image: string;
  dimensions: string;
}

export interface CartItem extends Artwork {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === artwork.id);
      if (existing) {
        toast({
          title: "Already in cart",
          description: "This artwork is already in your cart",
        });
        return prev;
      }
      toast({
        title: "Added to cart",
        description: `${artwork.title} has been added to your cart`,
      });
      return [...prev, { ...artwork, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
