import React from 'react';
import { bool, func, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '<src>/components/UI/Spinner';
import {
  sendMessage,
  processingRequest,
  openComposeModal,
} from '<redux>/actions/dashboardActions';

/**
 * @class ComposeModal
 * @description ComposeModal component
 * @param {object} event - Synthetic event object
 */
class ComposeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiver: '',
      subject: '',
      message: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const {
      sendMessageMethod,
      displayLoader,
      openComposeModalMethod,
    } = this.props;

    displayLoader();
    const message = {
      receiverId: this.state.receiver,
      subject: this.state.subject,
      message: this.state.message,
    };

    await sendMessageMethod(message);
    openComposeModalMethod(false);
  };

  closeComposeModal = () => {
    const { openComposeModalMethod } = this.props;
    openComposeModalMethod(false);
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component
   */
  render() {
    const {
      composeModalOpen, errors, isLoading,
    } = this.props;
    return (
      <div
        id="compose-modal-id"
        className={`compose-modal ${
          composeModalOpen ? 'display-block' : 'display-none'
        }`}
      >
        <div className="compose-modal-header">
          <h3 className="compose-modal-title">Compose a new email</h3>
          <span
            onClick={this.closeComposeModal}
            id="modal-close-id"
            className="modal-close"
          >
            &times;
          </span>
        </div>

        <div className="compose-modal-body">
          <form onSubmit={this.submitForm} id="compose-form-id">
            {errors && (
              <span
                id="compose-error"
                className="compose-error-class display-block"
              >
                {errors}
              </span>
            )}

            <input
              required
              onChange={this.onChange}
              name="receiver"
              type="email"
              placeholder="To: "
            />
            <input
              required
              onChange={this.onChange}
              name="subject"
              type="text"
              placeholder="Subject: "
            />
            <textarea
              onChange={this.onChange}
              name="message"
              cols="50"
              rows="18"
              required
              form="compose-form-id"
            />
            <br />
            <div className="center-content">
              <button type="submit" id="compose-send-button">
                {isLoading ? <Spinner /> : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
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
    sendMessageMethod: sendMessage,
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
  const {
    isMobileDevice, errors, isLoading, composeModalOpen,
  } = dashboard;
  return {
    isMobileDevice,
    errors,
    isLoading,
    composeModalOpen,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeModal);

ComposeModal.propTypes = {
  composeModalOpen: bool.isRequired,
  isLoading: bool.isRequired,
  isMobileDevice: bool.isRequired,
  errors: string.isRequired,
  openComposeModalMethod: func.isRequired,
  displayLoader: func.isRequired,
  sendMessageMethod: func.isRequired,
};
