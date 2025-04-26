import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ProductList from './ProductList';
import CategoryList from './CategoryList';

function HomePage() {
    const [activeList, setActiveList] = useState(0);
    const navigate = useNavigate();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveList(newValue);
        if (newValue === 0) {
          navigate('/product');
        } else if (newValue === 1) {
          navigate('/categories');
        }
    };
  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs value={activeList} onChange={handleChange} aria-label="navigation tabs">
          <Tab label="Produtos" />
          <Tab label="Categorias" />
        </Tabs>
      </Box>
      <Box p={2}>
        {activeList === 0 && <ProductList />}
        {activeList === 1 && <CategoryList />}
      </Box>
    </Box>
  );
}

export default HomePage;