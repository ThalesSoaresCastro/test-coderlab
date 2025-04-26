import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box p={4}>
      <Typography variant="h6" component="h2" gutterBottom>
        Editar Produto
      </Typography>
      <Typography variant="body2">Formulário para editar o produto com ID: {id}</Typography>
      {/* Aqui você irá implementar o formulário de edição */}
    </Box>
  );
}

export default EditProduct;