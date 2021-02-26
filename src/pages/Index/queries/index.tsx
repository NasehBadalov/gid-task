import { gql } from '@apollo/client';

export const getAllOpportunities = gql`
  query getAllOpportunities {
    allOpportunity(sort: "-application_count") {
      data {
        title
        applicants_count
        cover_photo
      }
    }
  }
`;
