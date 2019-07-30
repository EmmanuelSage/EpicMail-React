/* eslint-disable no-use-before-define */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bool, func } from 'prop-types';
import { setIsMobile } from '<redux>/actions/dashboardActions';

class MediaQuery extends React.Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { setIsMobileMethod } = this.props;
    if (matchMedia) {
      const mq = window.matchMedia('(min-width: 768px)');
      mq.addListener(WidthChange);
      WidthChange(mq);
    }

    function WidthChange(mq) {
      if (mq.matches) {
        setIsMobileMethod(false);
      } else {
        setIsMobileMethod(true);
      }
    }
  }

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component
   */
  render() {
    return <></>;
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
  const { isMobileDevice } = dashboard;
  return { isMobileDevice };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaQuery);

MediaQuery.propTypes = {
  setIsMobileMethod: func.isRequired,
  isMobileDevice: bool.isRequired,
};
