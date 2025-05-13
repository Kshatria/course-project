import { gql } from '@apollo/client';

const OPERATION_PROFIT = gql`
  query Query($getOneId: ID!) {
    operations {
      getOne(id: $getOneId) {
        ... on Profit {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            id
            name
            photo
            createdAt
            updatedAt
            commandId
          }
          type
          commandId
        }
      }
    }
  }
`;

const OPERATION_COST = gql`
  query Query($getOneId: ID!) {
    operations {
      getOne(id: $getOneId) {
        ... on Cost {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            id
            name
            photo
            createdAt
            updatedAt
            commandId
          }
          type
          commandId
        }
      }
    }
  }
`;

export { OPERATION_PROFIT, OPERATION_COST };
