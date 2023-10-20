import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState: Pick<AuthContextType, 'user'> = {
  user: null,
};

if (localStorage.getItem('mernShopToken')) {
  const decoded: any = jwtDecode(localStorage.getItem('mernShopToken')!);

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('mernShopToken');
  } else {
    initialState.user = decoded;
  }
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userInfo: { username: string; password: string }) => {},
  logout: () => {},
});

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = ({ children }: { [key: string]: any }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: any) => {
    localStorage.setItem('mernShopToken', user.token);

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };

  const logout = () => {
    localStorage.removeItem('mernShopToken');
    dispatch({ type: 'LOGOUT' });
    window.location.assign('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
