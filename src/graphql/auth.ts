import { gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        profile {
          commandId
          email
          id
          name
          signUpDate
        }
        token
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Profile($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        profile {
          commandId
          email
          id
          name
          signUpDate
        }
        token
      }
    }
  }
`;

export { LOGIN_MUTATION, SIGN_UP_MUTATION };
