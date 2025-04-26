import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box p={4}>
      <Typography variant="h6" component="h2" gutterBottom>
        Detalhes do Produto
      </Typography>
      <Typography variant="body2">Detalhes do produto com ID: {id}</Typography>
      {/* Aqui você irá buscar e exibir os detalhes do produto */}
    </Box>
  );
}

export default ProductDetail;