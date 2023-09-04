const Input = ({ onChange, onSend, message }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onSend(message);
  };
  return (
    <div className="input-wrapper">
      {" "}
      <input
        type="text"
        name="input"
        onChange={onChange}
        value={message}
        className="chat-input"
      />
      <button type="submit" onClick={onSubmit} className="send-button">
        Send
      </button>
    </div>
  );
};

export default Input;
