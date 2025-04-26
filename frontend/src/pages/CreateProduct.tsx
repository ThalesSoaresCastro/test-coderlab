import React from 'react';
import { Typography, Box } from '@mui/material';

function CreateProduct() {
  return (
    <Box p={4}>
      <Typography variant="h6" component="h2" gutterBottom>
        Criar Novo Produto
      </Typography>
      <Typography variant="body2">Formulário para criar um novo produto.</Typography>
      {/* Aqui você irá implementar o formulário de criação */}
    </Box>
  );
}

export default CreateProduct;