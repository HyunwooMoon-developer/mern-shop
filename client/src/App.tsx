import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ShopProvider from './context/shop';
import AuthProvider from './context/auth';
import client from './utils/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Home from './pages/Home';
import NavMenu from './components/NavMenu';
import AuthRoute from './utils/AuthRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const App = () => (
  <ApolloProvider client={client}>
    <ShopProvider>
      <AuthProvider>
        <Router>
          <NavMenu />
          <Cart />
          <Container className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<AuthRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </Container>
          <Footer />
        </Router>
      </AuthProvider>
    </ShopProvider>
  </ApolloProvider>
);
export default App;
