import React, { SetStateAction, useState } from 'react';
// Components
import { OpportunityItem } from '../OpportunitiesItem';
import { Loading } from '../../../../components/Loading';
// Ant
import { Button, Select } from 'antd';
// TS
import { IOpportunity } from '../../interfaces';
import { sortByData } from '../../consts';
// GraphQL
import { useLazyQuery } from '@apollo/client';
import { getAllOpportunities } from '../../queries';
// Style
import './_style.scss';

export const Opportunities: React.FC = () => {
  const [sortBy, setSortBy] = useState(sortByData[0].key);
  const [opportunities, setOpportunities] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [paging, setPaging] = React.useState({ total_items: 0, current_page: 0, total_pages: 0 });
  const [getOpportunities, { loading, data }] = useLazyQuery(getAllOpportunities);

  React.useEffect(() => {
    getOpportunities({
      variables: {
        sort: sortBy,
        page,
      },
    });
  }, [sortBy, page]);
  React.useEffect(() => {
    if (data && !loading) {
      const {
        allOpportunity: { data: opportunities, paging },
      } = data;

      setOpportunities((prevState): SetStateAction<any> => [...prevState, ...opportunities]);
      setPaging(paging);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prevState): SetStateAction<any> => setPage(prevState + 1));
  };

  return (
    <div className="Opportunities" id="opp-scroll">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="Opportunities__header">
              <span className="Opportunities__header-result">{paging.total_items} opportunities found</span>
              <span className="Opportunities__header-sort">
                <span>Sort by</span>
                <Select defaultValue="relevance" style={{ width: '200px' }} onChange={(value) => setSortBy(value)}>
                  {sortByData.map(({ label, key }) => (
                    <Select.Option value={key}>{label}</Select.Option>
                  ))}
                </Select>
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10">
            {opportunities.map((opportunity: IOpportunity) => (
              <OpportunityItem key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
        {loading && !data && (
          <div className="row justify-content-center">
            <div className="col-2">
              <Loading />
            </div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-4">
            <Button onClick={handleLoadMore} style={{ width: '100%', margin: '25px' }}>
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
