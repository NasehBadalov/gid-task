import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="*" render={() => <h1>NOT FOUND :(</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
