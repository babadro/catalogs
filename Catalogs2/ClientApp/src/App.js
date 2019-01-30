import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CreateCatalog } from './components/CreateCatalog';
import { Catalogs } from './components/Catalogs';
import { Catalog } from './components/Catalog';
import { CreateElement} from './components/CreateElement';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/createcat' component={CreateCatalog} />
        <Route path='/catalogs' component={Catalogs} />
        <Route path='/catalog/:catalogid' component={Catalog} />
        <Route path='/element/create/:catalogid' component={CreateElement} />
      </Layout>
    );
  }
}
