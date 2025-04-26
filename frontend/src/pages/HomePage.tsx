import { Heading, Text, Box } from '@chakra-ui/react';

function HomePage() {
  return (
    <Box p={4}>
      <Heading size="xl">Bem-vindo à Loja!</Heading>
      <Text mt={4}>Explore nossos produtos e categorias.</Text>
    </Box>
  );
}

export default HomePage;