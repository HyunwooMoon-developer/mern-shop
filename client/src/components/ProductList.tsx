import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from './Product';
import { ShopContext } from '../context/shop';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';

const ProductList = () => {
  const { currentCategory, q } = useContext(ShopContext) as ShopContextType;

  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      category: currentCategory,
      name: q,
    },
  });
  const products = data?.getProducts;

  if (loading) return null;
  return (
    <Row>
      {products?.map((product: ProductType) => (
        <Col key={product.id} md={4}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
