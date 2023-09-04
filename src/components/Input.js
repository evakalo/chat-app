const Input = ({ onChange, onSend, message }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSend(message);
  };
  return (
    <form className="input-wrapper" onSubmit={onSubmit}>
      {" "}
      <input
        type="text"
        name="input"
        onChange={onChange}
        value={message}
        className="chat-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
};

export default Input;
