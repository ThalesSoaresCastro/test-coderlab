import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Grid, TextField, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import { debounce } from 'lodash';

import { Product } from '../common/types';
import ProductComponent from '../components/ProductComponent';
import ProductForm from '../components/ProductForm'; // Importe o ProductForm
import { useProduct } from '../hooks/ProductContext';
import { fetchProducts, fetchProductDelete } from '../services/ProductService';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProductList() {
  const { products, setProducts } = useProduct();
  const [filterName, setFilterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const loadProducts = useCallback(async (name?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(name);
      setProducts(data);
      setLoading(false);
    } catch (err: any) {
      setError('Erro ao carregar os produtos.');
      setLoading(false);
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
      setError('Erro ao remover o produto.');
      toast.error('Erro ao remover o produto!');
    }
  }, [setProducts, fetchProductDelete]);

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleProductUpdated = () => {
    // Após a atualização bem-sucedida no modal, recarregue a lista de produtos
    loadProducts();
    handleCloseEditModal();
  };

  if (loading) {
    return <Typography>Carregando produtos...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
              onEdit={handleOpenEditModal} // Passe a função para abrir o modal
            />
          </Grid>
        ))}
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Produto
          </Typography>
          {productToEdit && (
            <ProductForm product={productToEdit} onProductUpdated={handleProductUpdated} onClose={handleCloseEditModal} />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default ProductList;