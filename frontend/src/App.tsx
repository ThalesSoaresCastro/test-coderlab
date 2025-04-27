import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList';
import ProductForm from './components/ProductForm';
import { ProductProvider } from './hooks/ProductContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CategoryProvider } from './hooks/CategoryContext';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CategoryProvider>
        <ProductProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductForm />} />
            </Routes>
          </Router>
        </ProductProvider>
      </CategoryProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </ThemeProvider>
  );
}

export default App;