import React, { createContext, useState, useContext, useCallback } from 'react';
import { Product } from '../common/types';

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setSelectedProduct: (product: Product | null) => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used inside a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]); // Inicializa o estado aqui
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getProductById = useCallback((id: string) => {
    return products.find((product) => product.id === id);
  }, [products]);

  const value: ProductContextType = {
    products,
    selectedProduct,
    setProducts,
    setSelectedProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};