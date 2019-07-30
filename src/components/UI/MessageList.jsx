import React from 'react';
import { array, func } from 'prop-types';
import profile from '<src>/assets/img/profile.png';

const MessageList = ({ onClickMethod, data, onClickDeleteMethod }) => {
  return (
    <ul>
      {data.map((message) => {
        return (
          <div
            onClick={onClickMethod}
            data-id={message.id}
            key={message.id}
            id="show-messages-id"
            className="show-messages-link"
          >
            <span data-id={message.id}>
              <img
                data-id={message.id}
                alt="Users image"
                className="user-img"
                src={profile}
              />
            </span>

            <span data-id={message.id} className="message-from">
              <p data-id={message.id}>
                <b data-id={message.id}>from : {message.senderid}</b> <br />
                <i data-id={message.id}> {message.subject} </i>
              </p>
            </span>

            <span
              data-delete-id={message.id}
              data-status={message.status}
              onClick={onClickDeleteMethod}
              className="delete-draft-message"
            >
              {' '}
              &otimes; Delete{' '}
            </span>
          </div>
        );
      })}
    </ul>
  );
};

export default MessageList;

MessageList.propTypes = {
  onClickMethod: func.isRequired,
  onClickDeleteMethod: func.isRequired,
  data: array.isRequired,
};
