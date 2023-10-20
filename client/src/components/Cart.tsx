import { useContext, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ShopContext } from '../context/shop';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../utils/queries';
import { AuthContext } from '../context/auth';

const Cart = () => {
  const { cartOpen, toggleCart } = useContext(ShopContext) as ShopContextType;
  const { user } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useQuery(GET_CART);
  console.log(data?.getCart);
  if (loading) return null;
  return user ? (
    <Offcanvas show={cartOpen} onHide={() => toggleCart()} placement="end">
      <Offcanvas.Header closeButton className="mt-2">
        <h3>Shopping Cart</h3>
      </Offcanvas.Header>
    </Offcanvas>
  ) : null;
};

export default Cart;
