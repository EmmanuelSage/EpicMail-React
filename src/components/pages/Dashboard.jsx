import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bool, func, array } from 'prop-types';
import 'regenerator-runtime';
import Header from '<src>/components/UI/Header';
import Background from '<src>/components/UI/Background';
import Menu from '<src>/components/UI/Menu';
import Messages from '<src>/components/UI/Messages';
import {
  setIsMobile,
  fetchInbox,
  processingRequest,
  displayMessageError,
} from '<redux>/actions/dashboardActions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  async componentDidMount() {
    const {
      fetchInboxMethod,
      displayLoader,
      displayMessageErrorMethod,
      messages,
      isLoggedIn,
    } = this.props;
    if (isLoggedIn) {
      await displayLoader();
      await fetchInboxMethod();
      if (messages.length === 0) {
        await displayMessageErrorMethod(
          `This would be an empty space when you have no messages,
           start messaging today..... :)`,
        );
      }
    }
  }

  showMobileModal = () => {
    const current = !this.state.modalIsOpen;
    this.setState({ modalIsOpen: current });
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component
   */
  render() {
    const { isMobileDevice, isLoggedIn } = this.props;
    return (
      <>
        {!isLoggedIn && <Redirect to="./signin" />}
        <Header dashboard={true} />
        <Background dashboard={true} animate={false}>
          <>
            <main className={`${!isMobileDevice ? 'main' : ''}`}>
              {this.state.modalIsOpen ? (
                <Menu
                  showMobileMenu={this.showMobileModal}
                  isMobile={isMobileDevice}
                />
              ) : (
                !isMobileDevice && (
                  <Menu
                    showMobileMenu={this.showMobileModal}
                    isMobile={isMobileDevice}
                  />
                )
              )}
              <Messages
                showMobileMenu={this.showMobileModal}
                currentView="INBOX"
                isMobile={isMobileDevice}
              />
              <footer />
            </main>
          </>
        </Background>
      </>
    );
  }
}

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
    displayMessageErrorMethod: displayMessageError,
  },
  dispatch,
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ dashboard, auth }) => {
  const { isMobileDevice, messages } = dashboard;
  const { isLoggedIn } = auth;
  return { isMobileDevice, messages, isLoggedIn };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

Dashboard.propTypes = {
  isMobileDevice: bool.isRequired,
  isLoggedIn: bool.isRequired,
  displayLoader: func.isRequired,
  fetchInboxMethod: func.isRequired,
  displayMessageErrorMethod: func.isRequired,
  messages: array.isRequired,
};
