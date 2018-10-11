/**
 *
 * ProjectItemPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Header as PageHeader } from 'semantic-ui-react';
import { IMMUTABLE_MAP, IMMUTABLE_LIST, ITEM } from '../App/constants';
import * as projectItem from '../App/getters/projectItem';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  projectsItemsBindActions,
  projectsBoxItemOutsBindActions,
  projectsEntriesFinderItemsBindActions,
  logoutCurrentUser,
} from '../App/actions';

import {
  makeSelectCurrentUser,
  makeSelectIsLoggedIn,
  makeSelectProjectsNextValues,
  makeSelectLocalSettings,
  makeSelectProjectsEntriesFinder,
  makeSelectProjectImportsProcessingData,
  makeSelectProjectsImportsProcessingData,
} from '../App/selectors';

import { changeId } from './actions';
import makeSelectProjectItemPage, {
  makeSelectProject,
  makeSelectProjectItem,
} from './selectors';

import Header from '../../components/Header';
import Container from '../../components/Container';
import FullheightColumn, {
  FullheightThis,
  FullheightAutoSizer,
} from '../../components/FullheightColumn';
import Notification from '../../components/Notification';
import LoadingIndicator from '../../components/LoadingIndicator';
import ProjectMenu from '../../components/ProjectMenu';
import ProjectItem from '../../components/ProjectItem';
import ProjectItemLabelDetail from '../../components/ProjectItemLabelDetail';

/* eslint-disable react/prefer-stateless-function */
export class ProjectItemPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getActionsBindPayload = this.getActionsBindPayload.bind(this);
  }

  componentWillMount() {
    this.loadProjectIfIdChanged(this.props, { isMount: true });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProjectIfIdChanged(nextProps);
  }

  loadProjectIfIdChanged(props, { isMount = false } = {}) {
    const { id, itemId } = props.projectItemPage;
    const { match } = props;
    const { params } = match;

    const nextId = params.id;
    const nextItemId = params.itemId;

    if (id !== nextId || itemId !== nextItemId || isMount) {
      props.fnChangeId(nextId, nextItemId);
    }
  }

  getActionsBindPayload() {
    const { dispatch, match, currentProject } = this.props;
    const additionalData = (() => {
      if (!currentProject) {
        return {};
      }

      return {
        moneyTypes: currentProject.getIn(
          ['moneyTypes', 'items'],
          IMMUTABLE_LIST,
        ),
        itemGradeTypes: currentProject.getIn(
          ['itemGradeTypes', 'items'],
          IMMUTABLE_LIST,
        ),
        weaponTypes: currentProject.getIn(
          ['weaponTypes', 'items'],
          IMMUTABLE_LIST,
        ),
      };
    })();

    return {
      dispatch,
      projectId: match.params.id,
      additionalData,
    };
  }

  getName() {
    const {
      currentProjectItem,
      currentProject,
      projectsNextValues,
    } = this.props;

    const projectNextValues = projectsNextValues.getIn(
      [currentProject.get('id'), currentProjectItem.get('id'), 'nextValue'],
      IMMUTABLE_MAP,
    );

    return projectItem.getName(projectNextValues, {
      entry: currentProjectItem,
    });
  }

  render() {
    const {
      currentUser,
      isLoggedIn,
      projectItemPage,
      currentProject,
      currentProjectItem,
      projectsNextValues,
      localSettings,
      projectsEntriesFinder,
      entriesFinderItemsActions,
      projectImportsProcessingData,
      fnLogoutCurrentUser,
      projectsImportsProcessingData,
    } = this.props;

    const { isLoaded, isError, errorMessage, isLoading, id } = projectItemPage;
    const actionsBindPayload = this.getActionsBindPayload();

    const {
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
    } = actionsBindPayload.additionalData;

    const itemActions = projectsItemsBindActions(actionsBindPayload);
    const boxItemOutActions = projectsBoxItemOutsBindActions(
      actionsBindPayload,
    );

    const nextValues =
      currentProject &&
      projectsNextValues.get(currentProject.get('id'), IMMUTABLE_MAP);

    const item = currentProjectItem;

    const itemNextValues =
      currentProject &&
      currentProjectItem &&
      nextValues.get(currentProjectItem.get('id'), IMMUTABLE_MAP);

    const entriesFinderItems =
      currentProject &&
      projectsEntriesFinder.getIn(
        [currentProject.get('id'), ITEM],
        IMMUTABLE_MAP,
      );

    return (
      <div>
        <Helmet>
          <title>ProjectItemPage</title>
          <meta name="description" content="Description of ProjectItemPage" />
        </Helmet>

        <Header
          currentProject={currentProject}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onClickLogout={fnLogoutCurrentUser}
          projectsImportsProcessingData={projectsImportsProcessingData}
        />

        <Container>
          {isError && (
            <Notification className="is-danger">{errorMessage}</Notification>
          )}

          {isLoading && <LoadingIndicator />}

          {isLoaded && (
            <Grid columns={2}>
              <Grid.Column largeScreen={3} widescreen={2}>
                <ProjectMenu
                  isLoggedIn={isLoggedIn}
                  project={currentProject}
                  projectId={id}
                  currentUser={currentUser}
                  projectImportsProcessingData={projectImportsProcessingData}
                />
              </Grid.Column>
              <FullheightColumn largeScreen={13} widescreen={14}>
                <PageHeader>
                  <FormattedMessage
                    {...messages.header}
                    values={{
                      title: currentProject.get(
                        'title',
                        currentProject.get('name'),
                      ),
                      itemName: this.getName(),
                    }}
                  />
                  <ProjectItemLabelDetail
                    item={item}
                    itemNextValues={itemNextValues}
                  />
                </PageHeader>
                <FullheightThis>
                  <FullheightAutoSizer>
                    <ProjectItem
                      item={item}
                      itemNextValues={itemNextValues}
                      nextValues={nextValues}
                      localSettings={localSettings}
                      moneyTypes={moneyTypes}
                      itemGradeTypes={itemGradeTypes}
                      weaponTypes={weaponTypes}
                      itemActions={itemActions}
                      boxItemOutActions={boxItemOutActions}
                      entriesFinderItems={entriesFinderItems}
                      entriesFinderItemsActions={entriesFinderItemsActions}
                    />
                  </FullheightAutoSizer>
                </FullheightThis>
              </FullheightColumn>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

ProjectItemPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectItemPage: makeSelectProjectItemPage(),
  currentUser: makeSelectCurrentUser(),
  currentProject: makeSelectProject(),
  currentProjectItem: makeSelectProjectItem(),
  isLoggedIn: makeSelectIsLoggedIn(),
  projectsNextValues: makeSelectProjectsNextValues(),
  projectsEntriesFinder: makeSelectProjectsEntriesFinder(),
  localSettings: makeSelectLocalSettings(),
  projectsImportsProcessingData: makeSelectProjectsImportsProcessingData(),
  projectImportsProcessingData: (
    state,
    {
      match: {
        params: { id },
      },
    },
  ) => makeSelectProjectImportsProcessingData(id)(state),
});

function mapDispatchToProps(
  dispatch,
  {
    match: {
      params: { id },
    },
  },
) {
  return {
    dispatch,
    fnLogoutCurrentUser: () => dispatch(logoutCurrentUser()),
    fnChangeId: (payloadID, itemId) => dispatch(changeId(payloadID, itemId)),
    entriesFinderItemsActions: projectsEntriesFinderItemsBindActions({
      projectId: id,
      dispatch,
    }),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'projectItemPage', reducer });
const withSaga = injectSaga({ key: 'projectItemPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectItemPage);
