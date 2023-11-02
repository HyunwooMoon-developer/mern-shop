import React, { useContext, useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { LOGIN } from '../utils/mutations';
import { redirect } from 'react-router-dom';

const Login = () => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const { login } = useContext(AuthContext) as AuthContextType;

  const [loginUser] = useMutation(LOGIN, {
    variables: userInfo,
    update(_, { data: { login: userData } }) {
      login(userData);
      redirect('/');
    },
    onError(err) {
      if (err.graphQLErrors) {
        const errorList = err.graphQLErrors.map(
          (e) =>
            e.extensions.argumentName && {
              [e.extensions.argumentName as string]: e.message,
            }
        );
        setErrors(Object.assign({}, ...errorList));
      }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <p className="h1 mb-5"> Login</p>
      <Form onSubmit={onSubmit} className="user-form">
        <Form.Group controlId="login_username" as={Col} md="4" className="mb-3">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Type Username"
            value={userInfo.username}
            isInvalid={!!errors['username']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="login_password" className="mb-5" as={Col} md="4">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Type Password"
            value={userInfo.password}
            isInvalid={!!errors['password']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
