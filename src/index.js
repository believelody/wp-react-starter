import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client"
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import client from './apollo-config/apolloClient';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
