import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faDesktop,
  faBars,
  faPuzzlePiece,
  faCog,
  faUser,
  faEnvelope,
  faShapes,
  faHome,
  faDollarSign,
  faTimes,
  faComment,
  faCommentAlt,
  faCheck,
  faTrash,
  faCopy,
  faSearch,
  faBinoculars,
  faPalette,
  faPaintBrush,
  faBrush,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import Footer from './Footer';
import Header from './Header';
import { AppContext } from '../../providers/AppProvider';
import { pathnameIncludes } from '../../utils/pathnameIncludes';
import EditUserInfoModal from '../dashboard/EditUserInfoModal';
import Notification from '../Notification';
import PasswordModal from '../auth/PasswordModal';
import { isBrowser } from '../../utils/isBrowser';
import EditSiteInfoModal from '../dashboard/EditSiteInfoModal';
import DeleteSiteModal from '../dashboard/DeleteSiteModal';
import DeleteUserModal from '../dashboard/DeleteUserModal';
import CustomizeModal from '../dashboard/CustomizeModal';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import { Helmet } from 'react-helmet';

library.add(
  faBars,
  faBolt,
  faDesktop,
  faPuzzlePiece,
  faCog,
  faEnvelope,
  faLinkedin,
  faGithub,
  faUser,
  faShapes,
  faHome,
  faDollarSign,
  faTimes,
  faComment,
  faCommentAlt,
  faCheck,
  faTrash,
  faCopy,
  far,
  faSearch,
  faBinoculars,
  faPalette,
  faBrush,
  faPaintBrush,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faPalette
);

const Layout = (props) => {
  const {
    editUserInfoModalOpen,
    passwordModalOpen,
    notificationMessage,
    notificationType,
    editSiteInfoModalOpen,
    deleteSiteModalOpen,
    deleteUserModalOpen,
    customizeModalOpen,
  } = useContext(AppContext);
  const { state, dispatch } = useContext(DatabaseContext);
  const { user, site } = state;

  if (isBrowser() && !/\/sites\/(.*)/.test(window.location.pathname) && site) {
    // dispatch({ type: 'logoutSite', data: {} });
  } else {
  }

  return (
    <Wrapper>
      {/* <Header siteTitle={props.title} /> */}
      {/* {!pathnameIncludes('/signup') && !pathnameIncludes('/login') && (
        <ContentWrapper />
      )} */}
      {props.children}
      <Footer />
      {editUserInfoModalOpen && <EditUserInfoModal />}
      {editSiteInfoModalOpen && <EditSiteInfoModal />}
      {deleteSiteModalOpen && <DeleteSiteModal />}
      {deleteUserModalOpen && <DeleteUserModal />}
      {passwordModalOpen && <PasswordModal />}
      {customizeModalOpen && <CustomizeModal />}
      {notificationMessage && (
        <Notification message={notificationMessage} type={notificationType} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 99999999999999999px !important;
  width: 100%;
  overflow: hidden;
  height: 100%;
  padding-right: ${(props) => props.width}px;
  p,
  small,
  code {
    color: ${(props) => props.theme.color.text.paragraph};
  }
  strong {
    color: ${(props) => props.theme.color.text.dark};
  }
  p,
  small,
  span,
  div,
  select,
  input,
  td,
  th,
  button {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif !important;
    font-size: 16px;
    font-weight: 400;
  }
  .title {
    font-family: 'Fira Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif !important;
  }
  .subtitle {
    font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
  }
  p {
    line-height: 27px;
  }
  small {
    font-size: 14px;
  }
  small {
    margin-bottom: 2px !important;
    display: block !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme.color.text.heading};
  }
  h1,
  h2 {
    margin-bottom: ${(props) => props.theme.spacing.five}px;
  }
  h3,
  h4 {
    margin-bottom: ${(props) => props.theme.spacing.four}px;
  }
  h5,
  h6 {
    margin-bottom: ${(props) => props.theme.spacing.three}px;
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  padding-top: ${(props) => (props.scrolled ? '66px' : '94px')};
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
