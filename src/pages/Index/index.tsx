import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
// GraphQL
import { getAllOpportunities } from './queries';
import { updateOpportunity } from './mutations';
// Components
import { Panel } from '../../layout/Panel';
import { Opportunities } from './components/Opportunities';

export const Index: React.FC = () => {
  const [opportunities, setOpportunities] = React.useState([]);
  const [paging, setPaging] = React.useState({ total_items: 0, current_page: 0, total_pages: 0 });
  const { loading, error, data } = useQuery(getAllOpportunities);
  const [editOpp, editedData] = useMutation(updateOpportunity);

  React.useEffect(() => {
    if (!loading) {
      const {
        allOpportunity: { data: opportunities, paging },
      } = data;

      setOpportunities(opportunities);
      setPaging(paging);
    }
  }, [data]);

  const makeMutation = () => {
    editOpp({ variables: { id: '5955', opportunity: { title: 'GV GV TEST' } } }).then((res) => console.log(res));
  };

  return (
    <div>
      <Panel>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">Americas Opportunities</div>
          </div>
        </div>
      </Panel>
      <Opportunities opportunities={opportunities} paging={paging} />
    </div>
  );
};
