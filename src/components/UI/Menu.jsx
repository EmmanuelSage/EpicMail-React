import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bool, func, string } from 'prop-types';
import {
  fetchSent,
  fetchInbox,
  fetchUnread,
  processingRequest,
  openComposeModal,
} from '<redux>/actions/dashboardActions';
import ComposeModal from './ComposeModal';

const Menu = ({
  isMobile,
  showMobileMenu,
  fetchSentMethod,
  fetchInboxMethod,
  fetchUnreadMethod,
  currentView,
  displayLoader,
  openComposeModalMethod,
  composeModalOpen,
}) => {
  const toggleModal = () => {
    openComposeModalMethod(!composeModalOpen);
  };

  const onSentClick = async () => {
    displayLoader();
    await fetchSentMethod();
  };

  const onInboxClick = async () => {
    displayLoader();
    await fetchInboxMethod();
  };

  const onUnreadClick = async () => {
    displayLoader();
    await fetchUnreadMethod();
  };
  return (
    <>
      <section
        id="dash-menu-id"
        className={isMobile ? 'dash-menu-overlay' : 'display-block menu'}
      >
        <div className="dash-menu">
          <div
            id="hide-x-desktop"
            className="compose close-mobile-menu-x shift-top"
          >
            <span
              onClick={showMobileMenu}
              id="close-mobile-menu"
              className="x-close"
            >
              &times;
            </span>
          </div>

          <div className="compose">
            <button onClick={toggleModal} id="compose-open-modal">
              Compose
            </button>
          </div>

          <div className="options">
            <span onClick={onInboxClick}>
              {currentView === 'INBOX' ? (
                <div className="current-dash">Inbox</div>
              ) : (
                <div>Inbox</div>
              )}
            </span>
            <span onClick={onSentClick}>
              {/* <div>Sent</div> */}
              {currentView === 'SENT' ? (
                <div className="current-dash">Sent</div>
              ) : (
                <div>Sent</div>
              )}
            </span>
            <span onClick={onUnreadClick}>
              {currentView === 'UNREAD' ? (
                <div className="current-dash">Unread</div>
              ) : (
                <div>Unread</div>
              )}
            </span>
          </div>
        </div>
      </section>
      <ComposeModal />
    </>
  );
};

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchSentMethod: fetchSent,
    fetchUnreadMethod: fetchUnread,
    fetchInboxMethod: fetchInbox,
    displayLoader: processingRequest,
    openComposeModalMethod: openComposeModal,
  },
  dispatch,
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ dashboard }) => {
  const { isMobileDevice, currentView, composeModalOpen } = dashboard;
  return {
    isMobileDevice,
    currentView,
    composeModalOpen,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

Menu.propTypes = {
  isMobileDevice: bool.isRequired,
  composeModalOpen: bool.isRequired,
  isMobile: bool.isRequired,
  showMobileMenu: func.isRequired,
  fetchSentMethod: func.isRequired,
  fetchInboxMethod: func.isRequired,
  fetchUnreadMethod: func.isRequired,
  displayLoader: func.isRequired,
  openComposeModalMethod: func.isRequired,
  currentView: string.isRequired,
};
