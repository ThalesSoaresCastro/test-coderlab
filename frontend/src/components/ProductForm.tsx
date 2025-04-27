import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { EditProduct, Category, CreateProduct } from '../common/types';
import { useCategory } from '../hooks/CategoryContext';
import { fetchProductByID, fetchProductUpdateByID, fetchProductCreate } from '../services/ProductService';
import { toast } from 'react-toastify';
import styles from './ProductForm.module.scss';

interface ProductFormValues {
  name: string;
  qty: number | null;
  price: number | null;
  photo: string;
  categories: string[];
}

const initialFormValues: ProductFormValues = {
  name: '',
  qty: 0,
  price: 0,
  photo: '',
  categories: [],
};

function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAddMode = id === '0';
  const productId = isAddMode ? null : id;
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { categories: availableCategories } = useCategory();

  useEffect(() => {
    if (!isAddMode && productId) {
      setLoading(true);
      fetchProductByID(productId)
        .then(data => {
          if (data) {
            setFormValues({
              name: data.name || '',
              qty: data.qty !== null ? data.qty : 0,
              price: data.price !== null ? data.price : 0,
              photo: data.photo || '',
              categories: data.categories?.map((cat: Category) => cat.id) || [],
            });
          } else {
            setError('Produto não encontrado.');
          }
        })
        .catch(err => {
          setError('Erro ao carregar os detalhes do produto.');
          console.error(err);
          toast.error('Erro ao carregar os detalhes do produto!');
        })
        .finally(() => setLoading(false));
    }
  }, [isAddMode, productId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormValues(prevValues => ({
      ...prevValues,
      categories: checked
        ? [...prevValues.categories, value]
        : prevValues.categories.filter(catId => catId !== value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isAddMode) {
        const payload: CreateProduct = {
          name: formValues.name,
          qty: typeof formValues.qty === 'string' ? parseInt(formValues.qty, 10) : formValues.qty ?? 0,
          price: typeof formValues.price === 'string' ? Number(formValues.price) : formValues.price ?? 0,
          photo: formValues.photo,
          categories: formValues.categories,
        };
        await fetchProductCreate(payload);
        toast.success(`Produto criado com sucesso!`);
        navigate('/product');
      } else if (productId) {
        const payload: EditProduct = {
          ...formValues,
          qty: typeof formValues.qty === 'string' ? parseInt(formValues.qty, 10) : formValues.qty,
          price: typeof formValues.price === 'string' ? Number(formValues.price) : formValues.price ?? 0,
          categories: formValues.categories,
        };
        await fetchProductUpdateByID(payload, productId);
        toast.success('Produto atualizado com sucesso!');
        navigate('/product');
      }
    } catch (err: any) {
      setError('Erro ao salvar o produto.');
      console.error(err);
      toast.error('Erro ao salvar o produto!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Carregando formulário...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className={styles.formStyle}>
      <Typography gutterBottom className={styles.titleForm}>
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

        <Typography variant="subtitle1" gutterBottom className={styles.titleCategoryList}>
          Selecione as Categorias:
        </Typography>
        <FormGroup>
          {availableCategories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={formValues.categories.includes(category.id)}
                  onChange={handleCategoryChange}
                  value={category.id}
                />
              }
              label={category.name}
              className={styles.formControlLabel}
            />
          ))}
        </FormGroup>

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {isAddMode ? 'Adicionar' : 'Salvar'}
          </Button>
          <Button component={RouterLink} to="/product" sx={{ ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProductForm;