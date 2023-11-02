import { useContext, useEffect, useState } from 'react';
import { Offcanvas, Row } from 'react-bootstrap';
import { ShopContext } from '../context/shop';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import { AuthContext } from '../context/auth';
import CartItem from './CartItem';
import { Add_Order, UPDATE_CART } from '../utils/mutations';
import { calculateTotal, formatUSD } from '../utils/functions';
import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {
  const [items, setItems] = useState<
    {
      product: string;
      size: string | null;
      color: string | null;
      quantity: number;
      price: number;
    }[]
  >([]);
  const [stripeToken, setStripeToken] = useState<any>(null);

  const { cartOpen, toggleCart } = useContext(ShopContext) as ShopContextType;
  const { user } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useQuery(GET_CART);

  const cart = data?.getCart;

  const [updateCart] = useMutation(UPDATE_CART, {
    variables: {
      id: cart?.id,
      input: items.map((item) => {
        const { price, ...rest } = item;
        return rest;
      }),
    },
    refetchQueries: [GET_CART, 'getCart'],
    onError(err) {
      console.log(err);
    },
  });

  const [addOrder] = useMutation(Add_Order, {
    variables: {
      input: {
        orderList: cart?.id,
        token: stripeToken?.id,
        amount: calculateTotal({ items }),
        street: stripeToken?.card.address_line1,
        city: stripeToken?.card.address_city,
        state: stripeToken?.card.address_state,
        zip: stripeToken?.card.address_zip,
      },
    },
    update(_, { data: { addOrder } }) {
      if (addOrder.success) {
        toggleCart();
      }
    },
    refetchQueries: [GET_CART, 'getCart'],
    onError(err) {
      console.log(err);
    },
  });

  const onToken = (token: any) => setStripeToken(token);

  const handleRemove = async (id: string, size?: string, color?: string) => {
    const deletedItem = items.find(
      (item) =>
        item.product === id && item.size === size && item.color === color
    );

    await setItems(items.filter((item) => item !== deletedItem));
    await updateCart();
  };

  useEffect(() => {
    if (cart && cart.products.length > 0) {
      setItems(
        cart.products.map((product: CartProductType) => ({
          product: product.product.id,
          size: product.size,
          quantity: product.quantity,
          color: product.color,
          price: product.product.price,
        }))
      );
    } else {
      setItems([]);
    }
  }, [cart]);

  useEffect(() => {
    if (stripeToken) {
      addOrder();
    }
  }, [stripeToken]);

  useEffect(() => {}, [stripeToken, cart]);

  if (loading) return null;
  return user ? (
    <Offcanvas
      show={cartOpen}
      onHide={() => toggleCart()}
      placement="end"
      style={{ width: 500 }}
    >
      <Offcanvas.Header closeButton className="mt-2">
        <h3>Shopping Cart</h3>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row style={{ maxHeight: 500, overflowY: 'auto' }}>
          {cart &&
            cart.products?.map((item: CartProductType, index: number) => (
              <CartItem
                key={`${item.product.id}-${index}`}
                item={item}
                onDelete={handleRemove}
              />
            ))}
        </Row>
        <Row>
          <h5>
            Total: <b>{formatUSD(calculateTotal({ items }))}</b>
          </h5>
        </Row>
        {cart && cart.products?.length > 0 ? (
          <Row className="justify-content-center">
            <StripeCheckout
              name="Moon Shop"
              ComponentClass="div"
              image={'/assets/cart.jpg'}
              stripeKey={import.meta.env.VITE_STRIPE_KEY}
              token={onToken}
              billingAddress
              shippingAddress
              description={`Your total is ${formatUSD(
                calculateTotal({ items })
              )}`}
            />
          </Row>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  ) : null;
};

export default Cart;
