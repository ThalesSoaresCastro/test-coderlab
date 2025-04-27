import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import { debounce } from 'lodash';
import ProductComponent from '../components/ProductComponent';
import { useProduct } from '../hooks/ProductContext';
import { useCategory } from '../hooks/CategoryContext';
import { fetchCategories } from '../services/CategoryService';
import { fetchProducts, fetchProductDelete } from '../services/ProductService';
import { toast } from 'react-toastify';

function ProductList() {
  const { products, setProducts } = useProduct();
  const { setCategories } = useCategory();
  const [filterName, setFilterName] = useState('');

  const loadProducts = useCallback(async (name?: string) => {
    try {
      const productsData = await fetchProducts(name);
      const categoriesData = await fetchCategories(); 
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: any) {
      toast.error('Erro ao carregar os produtos!');
    }
  }, [setProducts, fetchProducts]);

  const debouncedLoadProducts = useCallback(debounce(loadProducts, 500), [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    debouncedLoadProducts(event.target.value);
  };

  const handleRemoveProduct = useCallback(async (id: string) => {
    try {
      await fetchProductDelete(id);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      toast.success('Produto removido com sucesso!');
      console.log(`Produto com ID ${id} removido com sucesso.`);
    } catch (err: any) {
      console.error(`Erro ao remover o produto com ID ${id}:`, err);
      toast.error('Erro ao remover o produto!');
    }
  }, [setProducts, fetchProductDelete]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} color="black">
        <Typography variant="h6" component="h2">
          Lista de Produtos
        </Typography>
        <Button
          component={RouterLink}
          to="/product/0"
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Adicionar Produto
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          label="Filtrar por nome"
          value={filterName}
          onChange={handleFilterChange}
          fullWidth
        />
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductComponent
              product={product}
              onRemove={handleRemoveProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;