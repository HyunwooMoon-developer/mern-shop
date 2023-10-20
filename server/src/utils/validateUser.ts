import jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/UserInterface';

const validateRegisterInput = (
  username: string,
  email: string,
  password: string
) => {
  const errors: { [key: string]: any } = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!email.match(regex)) {
      errors.email = 'Unvalid Email';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return errors;
};

const validateLoginInput = (username: string, password: string) => {
  const errors: { [key: string]: any } = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return errors;
};

const generateToken = (user: UserInterface) =>
  jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_TOKEN as string,
    { expiresIn: '24h' }
  );

export { validateRegisterInput, validateLoginInput, generateToken };
