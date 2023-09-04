const Message = ({ messages, user }) => {
  return (
    <div className="messages-container">
      {messages.map((message, id) => {
        const username = message.member.clientData.name;
        const styleMessage = username === user.name ? "myMessage" : "message";
        const styleUser = username === user.name ? "me" : "otherUser";
        return (
          <div className="messages-wrapper" key={message.id}>
            <div className={styleUser}>{username}</div>
            <div className={styleMessage}>
              {/* <div className="message-photo"></div> */}
              <div className="message-text">{message.data}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
