import React, { useCallback, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useCategory } from '../hooks/CategoryContext';
import { toast } from 'react-toastify';
import { fetchCategories } from '../services/CategoryService';
import CategoryComponent from '../components/CategoryComponent';

function CategoryList() {
  const { categories, setCategories } = useCategory();

  const loadCategories = useCallback(async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (err: unknown) {
      toast.error('Erro ao carregar as categorias!');
      console.error(err);
    }
  }, [setCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <Box p={4}>
      <Typography variant="h6" component="h2" color="black">
        Lista de Categorias
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <CategoryComponent category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryList;