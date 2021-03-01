import React, { SetStateAction, useState } from 'react';
import { Button, Select, DatePicker, Modal, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
// Components
import { OpportunityItem } from '../OpportunitiesItem';
import { Loading } from '../../../../components/Loading';
// TS
import { IOpportunity } from '../../interfaces';
import { initialState, sortByData } from '../../consts';
import { EDurationNames, EDurationType, EProgramFullNames, EProgramIds } from '../../enums';
// GraphQL
import { useLazyQuery, useMutation } from '@apollo/client';
import { getAllOpportunities } from '../../queries';
import { updateOpportunity } from '../../mutations';

// Style
import './_style.scss';

export const Opportunities: React.FC = () => {
  // Apollo hooks
  const [getOpportunities, { loading, data }] = useLazyQuery(getAllOpportunities);
  const [editOpp] = useMutation(updateOpportunity);
  // Data
  const [opportunities, setOpportunities] = React.useState(initialState.opportunities);
  // Paging
  const [page, setPage] = React.useState(initialState.page);
  const [paging, setPaging] = React.useState(initialState.paging);
  // Sorting
  const [sortBy, setSortBy] = useState(initialState.sortBy);
  // Filter
  const [date, setDate] = React.useState(initialState.date);
  const [programmes, setProgrammes] = React.useState(initialState.programmes);
  const [durationType, setDurationType] = React.useState(initialState.durationType);
  // Edit Modal
  const [isModalVisible, setIsModalVisible] = React.useState(initialState.isModalVisible);
  const [openedOpp, setOpenedOpp] = React.useState(initialState.openedOpp);
  const [newEditTitle, setNewEditTitle] = React.useState(initialState.newEditTitle);
  const [newEditDesc, setNewEditDesc] = React.useState(initialState.newEditTitle);

  React.useEffect(() => {
    setOpportunities(initialState.opportunities);
    setPage(initialState.page);
  }, [sortBy, durationType, programmes, date]);
  React.useEffect(() => {
    getOpportunities({
      variables: {
        sort: sortBy,
        page,
        startDate: date,
        durationType,
        programmes,
      },
    });
  }, [sortBy, page, durationType, programmes, date, getOpportunities]);

  React.useEffect(() => {
    if (data && !loading) {
      const {
        allOpportunity: { data: opportunities, paging },
      } = data;

      setPaging(paging);
      setOpportunities((prevState): SetStateAction<any> => (page > 1 ? [...prevState, ...opportunities] : opportunities));
    }
  }, [data, loading]);

  const handleLoadMore = () => {
    setPage((prevState): SetStateAction<any> => setPage(prevState + 1));
  };

  const handleEditModalMutation = () => {
    editOpp({ variables: { id: openedOpp.id, opportunity: { title: newEditTitle, description: newEditDesc } } }).then((res) => {
      setIsModalVisible(false);
      setOpenedOpp(initialState.openedOpp);
      setNewEditTitle(initialState.newEditTitle);
      toast.success('🦄 Success!');
    });
  };

  return (
    <>
      <ToastContainer />
      <Modal title="Edit Title" visible={isModalVisible} onOk={handleEditModalMutation} onCancel={() => setIsModalVisible(false)}>
        <span>Title:</span>
        <Input placeholder="New title" value={newEditTitle} onChange={(e) => setNewEditTitle(e.target.value)} />
        <hr />
        <span>Description:</span>
        <Input.TextArea
          //
          value={newEditDesc}
          onChange={(e) => setNewEditDesc(e.target.value)}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>
      <div className="Panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="Panel__wrapper">
                <div className="Panel__block">
                  <span className="Panel__block-label">Program</span>
                  <Select defaultValue={JSON.stringify(initialState.programmes)} style={{ width: '150px' }} onChange={(value) => setProgrammes(JSON.parse(value))}>
                    <Select.Option value={JSON.stringify(initialState.programmes)}>All</Select.Option>
                    <Select.Option value={EProgramIds.GV}>{EProgramFullNames.GV}</Select.Option>
                    <Select.Option value={EProgramIds.GTa}>{EProgramFullNames.GTa}</Select.Option>
                    <Select.Option value={EProgramIds.GTe}>{EProgramFullNames.GTe}</Select.Option>
                  </Select>
                </div>
                <div className="Panel__block">
                  <span className="Panel__block-label">available for</span>
                  <Select defaultValue={EDurationType.short} onChange={(value) => setDurationType(value)}>
                    <Select.Option value={EDurationType.short}>{EDurationNames.short}</Select.Option>
                    <Select.Option value={EDurationType.medium}>{EDurationNames.medium}</Select.Option>
                    <Select.Option value={EDurationType.long}>{EDurationNames.long}</Select.Option>
                  </Select>
                </div>
                <div className="Panel__block">
                  <span className="Panel__block-label">from</span>
                  <DatePicker defaultValue={moment(initialState.date, 'YYYY-MM-DD')} onChange={(date, dateString) => setDate(dateString)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Opportunities">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className="Opportunities__header">
                <span className="Opportunities__header-result">{paging.total_items} opportunities found</span>
                <span className="Opportunities__header-sort">
                  <span>Sort by</span>
                  <Select defaultValue={sortByData[0].key} style={{ width: '200px' }} onChange={(value) => setSortBy(value)}>
                    {sortByData.map(({ label, key }) => (
                      <Select.Option key={key} value={key}>
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </span>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              {opportunities.map((opportunity: IOpportunity) => (
                <OpportunityItem
                  key={opportunity.id}
                  opportunity={opportunity}
                  onClick={(id: string, title: string, description: string) => {
                    setOpenedOpp({ id, title, description });
                    setNewEditTitle(title);
                    setNewEditDesc(description);
                    setIsModalVisible(true);
                  }}
                />
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
          {page < paging.total_pages && (
            <div className="row justify-content-center">
              <div className="col-4">
                <Button onClick={handleLoadMore} disabled={loading} style={{ width: '100%', margin: '25px' }}>
                  Load More
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
