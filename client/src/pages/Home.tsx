import { Col, Container, Row } from 'react-bootstrap';
import CategoryList from '../components/CategoryList';
import SearchItem from '../components/SearchItem';
import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <Container>
      <Row className="mb-5">
        <Col md={9} />
        <Col md={3}>
          <SearchItem />
        </Col>
      </Row>
      <Row className="ml-2">
        <Col md={3}>
          <CategoryList />
        </Col>
        <Col md={9}>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
