import React, { useState, useContext } from "react";
import { Context } from "../Context";
import $ from "jquery";
import "./Footer.scss";

const Footer = () => {
  const [text, setText] = useState("");
  const { comments, setComments } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;
    setText("");
    addDocument();
  };

  const addDocument = () => {
    const commentsCopy = [...comments];
    const newId = $(".main-comment").length + $(".reply").length + 1;
    const newComment = {
      id: newId,
      content: text,
      createdAt: "Today",
      score: 0,
      user: {
        image: {
          png: commentsCopy[0].currentUser.image.png,
          webp: commentsCopy[0].currentUser.image.webp,
        },
        username: commentsCopy[0].currentUser.username,
      },
      replies: [],
      voted: null,
    };

    commentsCopy[0].comments.push(newComment);
    setComments([...commentsCopy]);
  };

  return (
    <footer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <img src="/assets/image-juliusomo.png" alt="profile" />
        <label className="sr-only">Comment:</label>
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="send-button">Send</button>
      </form>
    </footer>
  );
};

export default Footer;
