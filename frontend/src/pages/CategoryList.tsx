import React from 'react';
import { Typography, Box } from '@mui/material';

function CategoryList() {
  return (
    <Box p={4}>
      <Typography variant="h6" component="h2">
        Lista de Categorias
      </Typography>
      <Typography variant="body1">Aqui você verá a lista de categorias.</Typography>
    </Box>
  );
}

export default CategoryList;