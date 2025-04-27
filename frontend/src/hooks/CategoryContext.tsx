import React, { createContext, useState, useContext, useCallback } from 'react';
import { Category } from '../common/types';

interface CategoryContextType {
  categories: Category[];
  selectedCategory: Category | null;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSelectedCategory: (category: Category | null) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used inside a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const getCategoryById = useCallback((id: string) => {
    return categories.find((category) => category.id === id);
  }, [categories]);

  const value: CategoryContextType = {
    categories,
    selectedCategory,
    setCategories,
    setSelectedCategory,
    getCategoryById,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};