import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  bool, func, string, array, object,
} from 'prop-types';
import {
  setIsMobile,
  fetchInbox,
  processingRequest,
  setSingleMessage,
  deleteMessage,
  fetchSent,
  fetchUnread,
} from '<redux>/actions/dashboardActions';
import MessageList from '<src>/components/UI/MessageList';
import ViewMessage from '<src>/components/UI/ViewMessage';
import Spinner from '<src>/components/UI/Spinner';

const Messages = ({
  isMobile,
  currentView,
  showMobileMenu,
  messages,
  isLoading,
  viewMessageList,
  singleMessage,
  setSingleMessageMethod,
  deleteMessageMethod,
  fetchInboxMethod,
  fetchSentMethod,
  fetchUnreadMethod,
  messageError,
}) => {
  const onClickMessage = (event) => {
    const specificMessage = event.target.attributes.getNamedItem('data-id');
    if (specificMessage !== null) {
      const messageId = Number(specificMessage.value);
      const newSingleMessage = messages.find((message) => {
        return message.id === messageId;
      });
      setSingleMessageMethod(newSingleMessage);
    }
  };
  const onClickDelete = (event) => {
    const specificMessage = event.target.attributes.getNamedItem(
      'data-delete-id',
    );
    const specificMessageStatus = event.target.attributes.getNamedItem(
      'data-status',
    );
    if (specificMessage !== null) {
      const messageId = Number(specificMessage.value);
      let index;
      messages.find((message, indx) => {
        if (message.id === messageId) {
          index = indx;
        }
        return message.id === messageId;
      });

      messages.splice(index, 1);

      deleteMessageMethod(messageId, messages);
      if (specificMessageStatus !== null) {
        const status = specificMessageStatus.value;
        switch (status) {
        case 'Sent':
          fetchSentMethod();
          break;
        case 'Unread':
          fetchUnreadMethod();
          break;
        default:
          fetchInboxMethod();
        }
      }
    }
  };

  return (
    <section className="content">
      <div className="content-menu">
        <span className="page-state">
          {isLoading ? (
            <div className="spinner-div">
              <Spinner message={true} />
            </div>
          ) : (
            currentView
          )}
        </span>
        <span
          onClick={showMobileMenu}
          className={isMobile ? 'visibility-visible' : 'visibility-hidden'}
          id="hamburger-link"
          to=""
        >
          &equiv;
        </span>
      </div>

      {messageError && (
        <div className="spinner-div error-message-margin-top">
          {messageError}
        </div>
      )}

      <div className="content-messages">
        {viewMessageList ? (
          <MessageList
            data={messages}
            onClickMethod={onClickMessage}
            onClickDeleteMethod={onClickDelete}
          />
        ) : (
          <ViewMessage data={singleMessage} />
        )}
      </div>
    </section>
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
    setIsMobileMethod: setIsMobile,
    fetchInboxMethod: fetchInbox,
    displayLoader: processingRequest,
    setSingleMessageMethod: setSingleMessage,
    deleteMessageMethod: deleteMessage,
    fetchSentMethod: fetchSent,
    fetchUnreadMethod: fetchUnread,
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
  const {
    isMobileDevice,
    messages,
    currentView,
    isLoading,
    viewMessageList,
    singleMessage,
    messageError,
  } = dashboard;
  return {
    isMobileDevice,
    messages,
    currentView,
    isLoading,
    viewMessageList,
    singleMessage,
    messageError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);

Messages.propTypes = {
  isMobileDevice: bool.isRequired,
  isMobile: bool.isRequired,
  fetchSentMethod: func.isRequired,
  fetchInboxMethod: func.isRequired,
  fetchUnreadMethod: func.isRequired,
  displayLoader: func.isRequired,
  currentView: string.isRequired,
  messages: array.isRequired,
  isLoading: bool.isRequired,
  viewMessageList: bool.isRequired,
  singleMessage: object.isRequired,
  setSingleMessageMethod: func.isRequired,
  deleteMessageMethod: func.isRequired,
  showMobileMenu: func.isRequired,
  messageError: string.isRequired,
};
