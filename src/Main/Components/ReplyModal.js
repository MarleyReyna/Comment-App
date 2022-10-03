import React, { useContext } from "react";
import { Context } from "../../Context";
import $ from "jquery";

const ReplyModal = (props) => {
  const { comments, setComments } = useContext(Context);
  const { id, indexCom, indexRep } = props;

  const handleReply = (e, id, indexCom, indexRep) => {
    e.preventDefault();
    const reply = e.target.reply.value;

    if (reply === "") return;
    addReply(reply, id, indexCom, indexRep);
    e.target.reply.value = "";
  };

  const addReply = (reply, id, indexCom, indexRep) => {
    const commentsCopy = [...comments];
    const newId = $(".main-comment").length + $(".reply").length + 1;

    const replyAt =
      indexRep === null
        ? comments[0].comments[indexCom].user.username
        : comments[0].comments[indexCom].replies[indexRep].user.username;

    const newComment = {
      id: newId,
      content: reply,
      createdAt: "Today",
      score: 0,
      replyingTo: replyAt,
      user: {
        image: {
          png: commentsCopy[0].currentUser.image.png,
          webp: commentsCopy[0].currentUser.image.webp,
        },
        username: commentsCopy[0].currentUser.username,
      },
      voted: null,
    };

    if (indexRep === null) {
      commentsCopy[0].comments[indexCom].replies.unshift(newComment);
    } else {
      commentsCopy[0].comments[indexCom].replies.splice(
        indexRep + 1,
        0,
        newComment
      );
    }

    $("#" + id).toggleClass("inactive");
    setComments([...commentsCopy]);
  };

  return (
    <section className="replyModal inactive" id={id}>
      <form onSubmit={(e) => handleReply(e, id, indexCom, indexRep)}>
        <img src="/assets/image-juliusomo.png" alt="profile" />
        <label className="sr-only">Reply:</label>
        <textarea placeholder="Add a comment..." name="reply" />
        <button className="send-button" type="submit">
          Reply
        </button>
      </form>
    </section>
  );
};

export default ReplyModal;
