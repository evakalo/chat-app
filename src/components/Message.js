const Message = ({ messages, user }) => {
  return (
    <div className="messages-container">
      {messages.map((message, id) => {
        const username = message.member.clientData.name;
        const styleMessage = username === user.name ? "myMessage" : "message";
        const styleUser = username === user.name ? "me" : "otherUser";
        const image = message.member.clientData.image;
        // const color = message.member.clientData.color;

        return (
          <div className="messages-wrapper" key={message.id}>
            <div className={styleUser}>{username}</div>
            <div className={styleMessage}>
              <div className="message-text">{message.data}</div>
              <div
                className="message-photo"
                style={{
                  background: `url(${image}) no-repeat center center/contain`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
