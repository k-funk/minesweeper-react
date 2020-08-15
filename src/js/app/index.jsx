import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import MainNav from 'app/components/main_nav';
import MainPage from 'app/components/main_page';


export default function App() {
  return (
    <HashRouter>
      <Container>
        <MainNav />

        <Switch>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Container>
    </HashRouter>
  );
}
