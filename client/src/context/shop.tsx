import { createContext, useReducer } from 'react';

const initialState: ShopType = {
  currentCategory: '',
  q: '',
  cartOpen: false,
};

export const ShopContext = createContext<ShopType | null>({
  currentCategory: '',
  q: '',
  cartOpen: false,
});

const shopReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        currentCategory: action.category,
      };
    case 'SEARCH_PRODUCT':
      return {
        ...state,
        q: action.q,
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    default:
      return state;
  }
};

const ShopProvider = ({ children }: { [key: string]: any }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const changeCategory = (category: string) =>
    dispatch({
      type: 'CHANGE_CATEGORY',
      category,
    });

  const searchProduct = (q: string) =>
    dispatch({
      type: 'SEARCH_PRODUCT',
      q,
    });

  const toggleCart = () =>
    dispatch({
      type: 'TOGGLE_CART',
      cartOpen: !state.cartOpen,
    });

  return (
    <ShopContext.Provider
      value={{
        ...state,
        changeCategory,
        searchProduct,
        toggleCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
