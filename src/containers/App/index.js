/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import { Switch, Route } from 'react-router-dom';
import React from 'react';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import RegisterPage from '../RegisterPage';
import LoginPage from '../LoginPage';

// Project(s)
import ProjectCreatePage from '../ProjectCreatePage';
import ProjectPage from '../ProjectPage';
import ProjectContributorsPage from '../ProjectContributorsPage';
import ProjectImportPage from '../ProjectImportPage';
import ProjectExportPage from '../ProjectExportPage';
import ProjectStoresPage from '../ProjectStoresPage';
import ProjectStorePage from '../ProjectStorePage';
import ProjectItemsPage from '../ProjectItemsPage';
import ProjectItemPage from '../ProjectItemPage';
import ProjectBoxItemOutsPage from '../ProjectBoxItemOutsPage';
import ProjectsPage from '../ProjectsPage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={LoginPage} />

      {/* Project(s) */}
      <Route exact path="/projects" component={ProjectsPage} />
      <Route exact path="/project/create" component={ProjectCreatePage} />
      <Route exact path="/project/:id" component={ProjectPage} />
      <Route
        exact
        path="/project/:id/contributors"
        component={ProjectContributorsPage}
      />
      <Route exact path="/project/:id/import" component={ProjectImportPage} />
      <Route exact path="/project/:id/export" component={ProjectExportPage} />
      <Route exact path="/project/:id/items" component={ProjectItemsPage} />
      <Route
        exact
        path="/project/:id/items/:itemId"
        component={ProjectItemPage}
      />
      <Route exact path="/project/:id/stores" component={ProjectStoresPage} />
      <Route
        exact
        path="/project/:id/stores/:storeId"
        component={ProjectStorePage}
      />
      <Route
        exact
        path="/project/:id/boxItemOuts"
        component={ProjectBoxItemOutsPage}
      />

      <Route component={NotFoundPage} />
    </Switch>
  );
}
