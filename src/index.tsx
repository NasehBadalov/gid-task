import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';

// Styles
import 'antd/dist/antd.css';
import './assets/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <h1>hello</h1>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
