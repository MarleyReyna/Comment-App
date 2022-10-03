import React, { useContext } from "react";
import { Context } from "../../Context";
import "../ComFooter.scss";

const ComUpvote = (props) => {
  const { comments, setComments } = useContext(Context);
  const { indexCom, indexRep, score } = props;

  const handleVote = (indexCom, indexRep, e) => {
    const commentsCopy = [...comments];
    const comm = commentsCopy[0].comments[indexCom];
    const reply = commentsCopy[0].comments[indexCom].replies[indexRep];

    if (indexRep === null) {
      if (e.currentTarget.id === "upvote" && comm.voted !== true) {
        comm.score = comm.score + 1;
        comm.voted === false ? (comm.voted = null) : (comm.voted = true);
      } else if (e.currentTarget.id === "downvote" && comm.voted !== false) {
        comm.score = comm.score - 1;
        comm.voted === true ? (comm.voted = null) : (comm.voted = false);
      }
    } else {
      if (e.currentTarget.id === "upvote" && reply.voted !== true) {
        reply.score = reply.score + 1;
        reply.voted === false ? (reply.voted = null) : (reply.voted = true);
      } else if (e.currentTarget.id === "downvote" && reply.voted !== false) {
        reply.score = reply.score - 1;
        reply.voted === true ? (reply.voted = null) : (reply.voted = false);
      }
    }
    setComments(commentsCopy);
  };

  return (
    <div className="upvotes">
      <button id="upvote" onClick={(e) => handleVote(indexCom, indexRep, e)}>
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <p aria-live="polite">{score}</p>
      <button id="downvote" onClick={(e) => handleVote(indexCom, indexRep, e)}>
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default ComUpvote;
