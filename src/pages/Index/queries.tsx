import { gql } from '@apollo/client';

export const getAllOpportunities = gql`
  query getAllOpportunities {
    allOpportunity(sort: "-accepted_count", page: 1) {
      data {
        id
        title
        applicants_count
        cover_photo
        description
        location
        programme {
          short_name_display
        }
        branch {
          company {
            name
            profile_photo
          }
        }
        opportunity_duration_type {
          duration_type
        }
      }
      paging {
        current_page
        total_items
        total_pages
      }
    }
  }
`;

// export const getAllOpportunities = (sort: string = '-application_count', page: number = 1) => {
//   return gql`
//     query getAllOpportunities {
//       allOpportunity(sort: "${sort}", page: ${page}) {
//         data {
//           id
//           title
//           applicants_count
//           cover_photo
//         }
//         paging {
//           current_page
//           total_items
//           total_pages
//         }
//       }
//     }
//   `;
// };
