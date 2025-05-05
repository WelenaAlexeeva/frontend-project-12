const MessageItem = (props) => {
  const username = props.username;
  const message = props.message;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {' '}
      :
      {message}
    </div>
  );
};

export default MessageItem;
