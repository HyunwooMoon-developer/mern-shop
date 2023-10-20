import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';
import { Button, Container, Row } from 'react-bootstrap';
import { ShopContext } from '../context/shop';

const CategoryList = () => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const { currentCategory, changeCategory } = useContext(
    ShopContext
  ) as ShopContextType;
  const categories = data?.getCategories;

  if (loading) return null;
  return (
    <Container className="gap-2">
      <Row className="mt-3" style={{ width: '50%' }}>
        <Button
          onClick={() => changeCategory('')}
          variant={currentCategory === '' ? 'primary' : 'outline-primary'}
        >
          All
        </Button>
      </Row>
      {categories?.map((category: CategoryType) => (
        <Row key={category.id} className="mt-3" style={{ width: '50%' }}>
          <Button
            onClick={() => changeCategory(category.id)}
            variant={
              currentCategory === category.id ? 'primary' : 'outline-primary'
            }
          >
            {category.name}
          </Button>
        </Row>
      ))}
    </Container>
  );
};

export default CategoryList;
