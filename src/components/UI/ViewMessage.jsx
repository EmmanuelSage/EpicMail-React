import React from 'react';
import { object } from 'prop-types';

const ViewMessage = ({ data }) => {
  return (
    <div id="view-inbox-message" className="content-messsages">
      <div className="view-message-thread" />
      <button className="thread">{`Message from ${data.senderid}`}</button>
      <div className="panel">
        <p>
          <i className="overflow-wrap">
            <b>Subject : </b> {data.subject}
          </i>
          <br />
          <br />
          <i className="overflow-wrap">
            <b>Message : </b> <br /> {data.message}
          </i>
        </p>
      </div>
    </div>
  );
};

export default ViewMessage;

ViewMessage.propTypes = {
  data: object.isRequired,
};
