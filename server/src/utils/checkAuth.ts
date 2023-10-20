import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const checkAuth = (context: any) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user: any = jwt.verify(token, process.env.SECRET_TOKEN as string);

        return user;
      } catch (err) {
        throw new GraphQLError('Invalid/Expired Token', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }
    }
    throw new GraphQLError(`Authentication token must be 'Bearer token'`, {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  throw new GraphQLError('Authorization header must be provided', {
    extensions: { code: 'UNAUTHENTICATED' },
  });
};

export default checkAuth;
