import React from "react";

const ComBody = (props) => {
  const content = props.content;
  const username = props.username;
  const currUser = props.currUser;
  const replyTo = props.replyTo;

  return (
    <div className="content">
      <p className="com-con" aria-live="polite">
        <span className={replyTo === null ? "at" : "at active"}>
          @{replyTo}
        </span>{" "}
        {content}
      </p>
      {username === currUser ? (
        <>
          <label className="sr-only">Edit your comment:</label>
          <textarea
            key={`${Math.floor(Math.random() * 1000000)}-min`}
            defaultValue={content}
            className="edit-area"
          />
        </>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ComBody;
