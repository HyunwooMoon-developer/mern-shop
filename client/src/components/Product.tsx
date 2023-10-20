import { useState, useContext } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { formatUSD } from '../utils/functions';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { AuthContext } from '../context/auth';
import { ShopContext } from '../context/shop';
import { ApolloCache, useMutation, useQuery } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import { UPDATE_CART } from '../utils/mutations';

const Product = ({ product }: { product: ProductType }) => {
  const [qty, setQty] = useState<number>(1);
  const [size, setSize] = useState<string | null>(
    product.size.length > 0 ? product.size[0] : null
  );
  const [color, setColor] = useState<string | null>(
    product.color.length > 0 ? product.color[0] : null
  );

  const { user } = useContext(AuthContext) as AuthContextType;
  const { toggleCart } = useContext(ShopContext) as ShopContextType;

  const { loading, data } = useQuery(GET_CART);
  const cart = data?.getCart;

  const [updateCart] = useMutation(UPDATE_CART, {
    variables: {
      id: cart?.id,
      input: [{ product: product.id, quantity: qty, size, color }],
    },
    update(cache: ApolloCache<any>) {
      toggleCart();
    },
    refetchQueries: [GET_CART, 'getCart'],
    onError(err) {
      console.log(err);
    },
  });

  if (loading) return null;

  return (
    <Card className="mt-5 g-4" style={{ width: 250, height: 500 }}>
      <Card.Img
        variant="top"
        src={`/assets/${product.image}`}
        style={{ width: 250, height: 200 }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <b>{formatUSD(product.price)}</b>
        </Card.Text>
        <Row className="gap-2">
          <Row style={{ marginLeft: 15 }} className="gap-2">
            <Col md={3}>
              <Button
                variant="outline-info"
                onClick={() => setQty(qty - 1)}
                disabled={qty === 0}
              >
                <AiOutlineMinus />
              </Button>
            </Col>
            <Col md={3}>
              <Form.Control
                style={{ width: 40 }}
                value={qty}
                placeholder={qty.toString()}
                disabled
              />
            </Col>
            <Col>
              <Button
                variant="outline-info"
                onClick={() => setQty(qty + 1)}
                disabled={qty === product.quantity}
              >
                <AiOutlinePlus />
              </Button>
            </Col>
          </Row>
          <Row></Row>
          <Row style={{ marginLeft: 1 }}>
            <Form.Group>
              {product.size.length > 0 ? (
                <Form.Select
                  onChange={(e) => setSize(e.target.value)}
                  style={{ textAlignLast: 'center' }}
                >
                  {product.size.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Select disabled>
                  <option>-</option>
                </Form.Select>
              )}
            </Form.Group>
          </Row>
          <Row style={{ marginLeft: 1 }}>
            <Form.Group>
              {product.color.length > 0 ? (
                <Form.Select
                  onChange={(e) => setColor(e.target.value)}
                  style={{ textAlignLast: 'center' }}
                >
                  {product.color.map((c) => (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Select disabled>
                  <option>-</option>
                </Form.Select>
              )}
            </Form.Group>
          </Row>
          <Row style={{ marginLeft: 1 }}>
            <Button
              variant={user ? 'outline-warning' : 'secondary'}
              disabled={!user}
              onClick={() => updateCart()}
            >
              Add to Cart
            </Button>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Product;
