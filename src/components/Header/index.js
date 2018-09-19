/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import packagejson from '../../../package.json';
import Button from '../Button';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      onClickLogout,
      projectsImportsProcessingData,
    } = this.props;

    const projectsImportsIsProcessing =
      projectsImportsProcessingData &&
      projectsImportsProcessingData.isProcessing;

    return (
      <Wrapper>
        <Brand>
          <LinkItemBrand to="/">
            <FormattedMessage {...messages.brand} />
            <BrandVersionBadge>v{packagejson.version}</BrandVersionBadge>
          </LinkItemBrand>
        </Brand>
        <div className="navbar-menu">
          <div className="navbar-start">
            <LinkItem to="/">
              <FormattedMessage {...messages.Home} />
            </LinkItem>
            <LinkItem to="/projects">
              <FormattedMessage {...messages.Projects} />
            </LinkItem>
            {currentProject && (
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <LinkButton
                      to={`/project/${currentProject.get('id')}`}
                      className="is-info"
                    >
                      <i className="fas fa-info" />
                      &nbsp;
                      {currentProject.get('title')}
                    </LinkButton>
                  </p>
                </div>
              </div>
            )}
            {projectsImportsIsProcessing && (
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <ProjectsImportsProcessingData className="is-info">
                      <span className="tag is-small percent is-danger">
                        {projectsImportsProcessingData.percent.toFixed(0)}%
                      </span>
                      <span className="tag is-small processes">
                        {projectsImportsProcessingData.countProcesses}
                      </span>
                      <i className="fas fa-angle-down" />
                    </ProjectsImportsProcessingData>
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                {!isLoggedIn && (
                  <React.Fragment>
                    <p className="control">
                      <LinkButton to="/login" className="is-black">
                        <FormattedMessage {...messages.signIn} />
                      </LinkButton>
                    </p>
                    <p className="control">
                      <LinkButton to="/register" className="is-black">
                        <FormattedMessage {...messages.signUp} />
                      </LinkButton>
                    </p>
                  </React.Fragment>
                )}
                {isLoggedIn && (
                  <React.Fragment>
                    <UserControlBlock>
                      <div className="username">
                        <i className="fas fa-user" />
                        &nbsp;
                        {currentUser.get('login')}
                      </div>
                      <div className="rolename">
                        {currentUser.getIn(['role', 'title'])}
                      </div>
                    </UserControlBlock>
                    <p className="control">
                      <LinkButton
                        to="/project/create"
                        className="is-primary"
                        title="Create new project"
                      >
                        <i className="fas fa-plus" />
                      </LinkButton>
                    </p>
                    <div className="control">
                      <Button
                        onClick={onClickLogout}
                        icon="sign-out-alt"
                        className="is-danger"
                      />
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.instanceOf(Map),
  currentProject: PropTypes.instanceOf(Map),
  onClickLogout: PropTypes.func.isRequired,
  projectsImportsProcessingData: PropTypes.shape({
    isProcessing: PropTypes.bool.isRequired,
    countTotal: PropTypes.number.isRequired,
    countCompleted: PropTypes.number.isRequired,
    countProcesses: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
  currentUser: null,
  currentProject: null,
};

export default Header;

const Wrapper = styled.header.attrs({ className: 'navbar' })`
  background: #2a3142;
  -webkit-app-region: drag;

  .control,
  .button,
  .navbar-item {
    -webkit-app-region: no-drag;
  }
`;
const Brand = styled.div.attrs({ className: 'navbar-brand' })``;
const LinkButton = styled(NavLink).attrs({ to: '/', className: 'button' })``;
const LinkItem = styled(NavLink).attrs({ to: '/', className: 'navbar-item' })`
  color: #ddd;
  transition: all 0.1s ease;
`;
const LinkItemBrand = styled(LinkItem).attrs({ to: '/' })`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 0px #2f2f2f;
  position: relative;
  top: -5px;
  transition: all 0.1s ease;
  &.active {
    color: #2d74de;
  }
  &.navbar-item:hover,
  &:hover {
    color: #fff;
  }
`;

const BrandVersionBadge = styled.span`
  position: absolute;
  top: 30px;
  font-size: 10px;
  text-transform: lowercase;
  color: gray;
`;

const UserControlBlock = styled.div.attrs({ className: 'control' })`
  color: #fff;

  .username {
    font-size: 14px;
  }

  .rolename {
    font-size: 12px;
  }
`;

const ProjectsImportsProcessingData = styled.button.attrs({
  className: 'button',
})`
  position: relative;
  background: transparent;

  .percent {
    position: absolute;
    z-index: 999;
    padding: 3px 0px;
    line-height: 12px;
    height: auto;
    text-align: center;
    right: -1px;
    top: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: calc(100% + 2px);
  }

  .processes {
    position: absolute;
    color: #fff;
    font-weight: bold;
    font-size: 11px;
    background: #000;
    height: auto;
    bottom: -1px;
    width: calc(100% + 2px);
    text-align: center;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 3px 0px;
    line-height: 12px;
  }
`;
