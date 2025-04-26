import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { EditProduct, Product } from '../common/types';
import { fetchProductUpdateByID } from '../services/ProductService';
import { toast } from 'react-toastify';

interface ProductFormProps {
  product?: Product;
  onProductUpdated: () => void;
  onClose: () => void;
}

const initialFormValues: EditProduct = {
  name: '',
  qty: 0,
  price: 0,
  photo: '',
  categories: [],
};

function ProductForm({ product, onProductUpdated, onClose }: ProductFormProps) {
  const isAddMode = !product?.id;
  const productId = product?.id;
  const [formValues, setFormValues] = useState<EditProduct>(initialFormValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormValues({
        id: product.id,
        name: product.name || '',
        qty: product.qty !== null ? product.qty : 0,
        price: product.price !== null ? product.price : 0,
        photo: product.photo || '',
        categories: product.categories?.map(cat => cat.id) || [],
      });
    } else {
      setFormValues(initialFormValues);
    }
  }, [product]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isAddMode) {
        console.log('Adicionar produto:', formValues);
        toast.info('Funcionalidade de adicionar produto ainda não implementada.');
        onClose();
      } else if (productId) {
        const payload = {
          ...formValues,
          qty: typeof formValues.qty === 'string' ? parseInt(formValues.qty, 10) : formValues.qty,
          price: typeof formValues.price === 'string' ? Number(formValues.price) : formValues.price,
        };
        await fetchProductUpdateByID(payload, productId);
        toast.success('Produto atualizado com sucesso!');
        onProductUpdated();
      }
    } catch (err: any) {
      setError('Erro ao salvar o produto.');
      console.error(err);
      toast.error('Erro ao salvar o produto!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
        {isAddMode ? 'Adicionar Novo Produto' : 'Editar Produto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantidade"
          name="qty"
          value={formValues.qty}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Preço"
          name="price"
          value={formValues.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Foto URL"
          name="photo"
          value={formValues.photo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Categorias (A edição de categorias precisará de um componente mais complexo)
        </Typography>
        {formValues.categories.map(categoryId => (
          <Typography key={categoryId} variant="body2">- ID: {categoryId}</Typography>
        ))}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {isAddMode ? 'Adicionar' : 'Salvar'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProductForm;