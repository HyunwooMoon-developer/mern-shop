type UserType = {
  id: string;
  usernmae: string;
  email: string;
  isAdmin: boolean;
  exp: number;
  iat: number;
};

type AuthContextType = {
  user: null | UserType;
  login: (userInfo: { username: string; password: string }) => void;
  logout: () => void;
};

type ShopContextType = {
  currentCategory: string;
  q: string;
  cartOpen: boolean;
  changeCategory: (caetgory: string) => void;
  searchProduct: (q: string) => void;
  toggleCart: () => void;
};

type ShopType = Pick<ShopContextType, 'currentCategory' | 'q' | 'cartOpen'>;

type CategoryType = {
  id: string;
  name: string;
};

type ProductType = {
  id: string;
  name: string;
  image?: string;
  desc: string;
  price: number;
  quantity: number;
  size: string[];
  color: string[];
  category: CategoryType;
};

type CartProductType = {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  size?: string;
  color?: string;
  quantity: number;
};
