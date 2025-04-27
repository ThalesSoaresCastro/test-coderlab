import { Category } from '../common/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const URL_BASE = `${API_BASE_URL}/category`;
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(URL_BASE);
  if (!response.ok) {
    throw new Error(`Erro ao carregar as categorias: ${response.status}`);
  }
  const data: Category[] = await response.json();
  return data;
};

export { 
    fetchCategories
};