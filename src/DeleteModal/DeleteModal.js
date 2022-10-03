import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import "./DeleteModal.scss";

const DeleteModal = (props) => {
  const { showDelete, setShowDelete, indices, comments, setComments } =
    useContext(Context);

  const handleDelete = (indexCom, indexRep) => {
    const commentsCopy = [...comments];

    if (indexRep === null) {
      commentsCopy[0].comments.splice(indexCom, 1);
    } else {
      commentsCopy[0].comments[indexCom].replies.splice(indexRep, 1);
    }

    setShowDelete((c) => (c = false));
    setComments(commentsCopy);
  };

  let deleteRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!deleteRef.current?.contains(e.target)) {
        setShowDelete(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <section className={showDelete ? "modal active" : "modal"} ref={deleteRef}>
      <h2>Delete Comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div>
        <button
          className="cancel"
          onClick={() => setShowDelete((c) => (c = false))}
          tabIndex="0"
        >
          No, Cancel
        </button>
        <button
          className="confirm"
          onClick={() => handleDelete(indices[0], indices[1])}
        >
          Yes, Delete
        </button>
      </div>
    </section>
  );
};

export default DeleteModal;
