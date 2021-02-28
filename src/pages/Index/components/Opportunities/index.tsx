import React from 'react';
// Components
import { OpportunityItem } from '../OpportunitiesItem';
// TS
import { IOpportunity, IPaging } from '../../interfaces';
// Style
import './_style.scss';

export const Opportunities: React.FC<{ opportunities: IOpportunity[]; paging: IPaging }> = ({ opportunities, paging: { total_items } }) => {
  return (
    <div className="Opportunities">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="Opportunities__header">
              <span className="Opportunities__header-result">{total_items} opportunities found</span>
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
      </div>
    </div>
  );
};
