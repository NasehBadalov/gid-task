import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import { Index } from '../pages/Index';
import { Content } from '../layout/Content';
import { Header } from '../layout/Header';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Content>
            <Index />
          </Content>
        </Route>
        <Route path="*" render={() => <h1 style={{ textAlign: 'center' }}>NOT FOUND :(</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
