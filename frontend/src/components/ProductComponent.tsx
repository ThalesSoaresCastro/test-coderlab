import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Product } from "../common/types";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ProductComponent.module.scss';

interface ProductComponentProps {
  product: Product;
  onRemove: (id: string) => void;
  onEdit: (product: Product) => void;
}

const ProductComponent = ({ product, onRemove, onEdit }: ProductComponentProps) => {
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
          <a href={product.photo} target="_blank" rel="noopener noreferrer">
            Foto
          </a>
        )}
        <Box mt={1}>
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
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => onEdit(product)}
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