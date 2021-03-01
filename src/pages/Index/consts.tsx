export const sortByData = [
  {
    label: 'Relevance',
    key: 'relevance',
  },
  {
    label: 'Applications Closing Date',
    key: 'applications_close_date',
  },
  {
    label: 'Newest',
    key: '-created_at',
  },
  {
    label: 'Duration: Descending',
    key: '+duration_max',
  },
  {
    label: 'Duration: Ascending',
    key: '-duration_max',
  },
  {
    label: 'Start Dates',
    key: '+earliest_start_date',
  },
];

export const initialState = {
  sortBy: sortByData[0].key,
  opportunities: [],
  page: 1,
  paging: { total_items: 0, current_page: 0, total_pages: 0 },
};
