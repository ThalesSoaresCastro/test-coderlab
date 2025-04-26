import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/categories">Categorias</Link>
              </li>
              <li>
                <Link to="/products">Produtos</Link>
              </li>
              <li>
                <Link to="/products/create">Criar Produto</Link>
              </li>
            </ul>
          </nav>

        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;