import React from 'react';
import { useQuery } from '@apollo/client';

// Queries
import { getAllOpportunities } from './queries';
import { IOpportunity } from './interfaces';

export const Index: React.FC = () => {
  const { loading, error, data } = useQuery(getAllOpportunities);
  const [opportunities, setOpportunities] = React.useState([]);

  React.useEffect(() => {
    if (!loading) {
      const {
        allOpportunity: { data: opportunities },
      } = data;

      setOpportunities(opportunities);
    }
  }, [data]);

  return (
    <div>
      <ul>
        {opportunities.map(({ title, cover_photo: { url: image_url } }: IOpportunity) => (
          <li>
            <div>
              <img src={image_url} alt="Opportunity Image" />
            </div>
            <h3>{title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
