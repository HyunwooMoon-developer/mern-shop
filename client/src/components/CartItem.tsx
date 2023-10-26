import { Button, Col, Image, Row } from 'react-bootstrap';
import { formatUSD } from '../utils/functions';
import { BsFillTrashFill } from 'react-icons/bs';

const CartItem = ({
  item,
  onDelete,
}: {
  item: CartProductType;
  onDelete: (id: string, size?: string, color?: string) => void;
}) => {
  const product = item.product;

  return (
    <Row key={product.id} className="gap-3 mb-4">
      <Col md={3}>
        <Image
          src={`/assets/${product.image}`}
          style={{ width: 100, height: 100 }}
          alt={product.name}
        />
      </Col>
      <Col md={6}>
        <Row>
          <Col md={4}>name:</Col>
          <Col>
            <b>{product.name}</b>
          </Col>
        </Row>
        <Row>
          <Col md={4}>price:</Col>{' '}
          <Col>
            <b>{formatUSD(product.price)}</b>
          </Col>
        </Row>
        <Row>
          <Col md={4}>qty:</Col>{' '}
          <Col>
            <b>{item.quantity}</b>
          </Col>
        </Row>
        {item.color ? (
          <Row>
            <Col md={4}>color:</Col>{' '}
            <Col>
              <b>{item.color}</b>
            </Col>
          </Row>
        ) : null}
        {item.size ? (
          <Row>
            <Col md={4}>size:</Col>{' '}
            <Col>
              <b>{item.size}</b>
            </Col>
          </Row>
        ) : null}
      </Col>
      <Col className="mt-3">
        <Button
          variant="outline-danger"
          onClick={() => onDelete(product.id, item.size, item.color)}
        >
          <BsFillTrashFill />
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
