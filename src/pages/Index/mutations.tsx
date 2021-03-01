import { gql } from '@apollo/client';

export const updateOpportunity = gql`
  mutation updateOpportunity($id: ID!, $opportunity: OpportunityInput) {
    updateOpportunity(id: $id, opportunity: $opportunity) {
      id
      title
      description
    }
  }
`;
