import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from 'modules/home/containers';
import HomeComponent from 'modules/home/components';

const Index = () => (
    <Switch>
        <Route exact path="/" render={props => (
            <HomeContainer {...props} Layout={HomeComponent} />
        )}/>
    </Switch>
);

export default Index;
