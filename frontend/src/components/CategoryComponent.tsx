import {Card, CardContent, Typography } from "@mui/material";
import { Category } from "../common/types";
import styles from './CategoryComponent.module.scss';
interface CategoryComponentProps {
  category: Category;
}

const CategoryComponent = ({ category }: CategoryComponentProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" className={styles.categoryName}>
          {category.name}
        </Typography>
       {category.children && 
          category.children.length > 0 && 
          <Typography className={styles.titleChildren}>
            Categorias associadas:
          </Typography>}
       {category.children && 
          category.children.length > 0 && 
          category.children.map(children => {
            return(<Typography className={styles.categoryChildern}>
                    {children.name}
                  </Typography>);
          })}
      </CardContent>
    </Card>
  );
};

export default CategoryComponent;