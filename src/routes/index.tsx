import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import { Index } from '../pages/Index';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="*" render={() => <h1 style={{ textAlign: 'center' }}>NOT FOUND :(</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
