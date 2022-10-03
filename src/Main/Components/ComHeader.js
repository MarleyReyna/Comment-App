import React from "react";

const ComHeader = (props) => {
  const pfp = props.pfp;
  const username = props.username;
  const currUser = props.currUser;
  const createAt = props.createAt;

  return (
    <div className="header">
      <img src={pfp} alt="profile" />
      <h1>{username}</h1>
      <p className={username === currUser ? "user active" : "user"}>you</p>
      <p>{createAt}</p>
    </div>
  );
};

export default ComHeader;
