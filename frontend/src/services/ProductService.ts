import { EditProduct, Product } from '../common/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const URL_BASE = `${API_BASE_URL}/product`;
const fetchProducts = async (filterName?:string): Promise<Product[]> => {
  const response = await fetch(URL_BASE+(filterName?`?name=${filterName}`:''));
  if (!response.ok) {
    throw new Error(`Erro ao carregar os produtos: ${response.status}`);
  }
  const data: Product[] = await response.json();
  return data;
};

const fetchProductByID = async (id:string): Promise<Product> => {
    const response = await fetch(`${URL_BASE}/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar o produto: ${response.status}`);
    }
    const data: Product = await response.json();
    return data;
};

const fetchProductUpdateByID = async (product: EditProduct, id: string): Promise<Product[]> => {
  const response = await fetch(`${URL_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Erro ao atualizar o produto: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data: Product[] = await response.json();
  return data;
};


const fetchProductDelete = async (id: string): Promise<void> => {
  const response = await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    let errorMessage = `Erro ao deletar o produto: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage += ` - ${JSON.stringify(errorData)}`;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
};

export { 
    fetchProducts, 
    fetchProductByID, 
    fetchProductUpdateByID, 
    fetchProductDelete 
};