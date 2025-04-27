import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Product } from "../common/types";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link as RouterLink } from 'react-router-dom';
import styles from './ProductComponent.module.scss';

interface ProductComponentProps {
  product: Product;
  onRemove: (id: string) => void;
}

const ProductComponent = ({ product, onRemove }: ProductComponentProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="subtitle1">
          Preço: R$ {product.price?.toFixed(2)}
        </Typography>
        <Typography>
          Quantidade: {product.qty}
        </Typography>
        {product.photo && (
          <a href={product.photo} target="_blank" rel="noopener noreferrer" className={styles.categoryPhoto}>
            Foto
          </a>
        )}
        <Box mt={1} display="flex" flexDirection="column">
          {product.categories?.map((category) => (
            <Typography
              key={category.id}
              className={styles.categoryName}
              variant="caption"
            >              
             {category.name}
            </Typography>
          ))}
        </Box>
        <Box className={styles.containerCategory}>
          <Button
            component={RouterLink}
            to={`/product/${product.id}`}
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
          >
            Editar
          </Button>
          <IconButton
            aria-label="remover"
            onClick={() => onRemove(product.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductComponent;