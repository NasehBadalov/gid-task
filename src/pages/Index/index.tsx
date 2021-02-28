import React from 'react';
import { useMutation } from '@apollo/client';
import { updateOpportunity } from './mutations';
// Components
import { Panel } from '../../layout/Panel';
import { Opportunities } from './components/Opportunities';

export const Index: React.FC = () => {
  const [editOpp, editedData] = useMutation(updateOpportunity);

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
      <Opportunities />
    </div>
  );
};
