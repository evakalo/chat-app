const Input = ({ onChange, onSend, message, disable }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSend(message);
  };

  return (
    <form className="input-wrapper" onSubmit={onSubmit}>
      {" "}
      <textarea
        type="text"
        name="input"
        onChange={onChange}
        value={message}
        className="chat-input"
      ></textarea>
      <button type="submit" className="send-button" disabled={disable}>
        Send
      </button>
    </form>
  );
};

export default Input;
