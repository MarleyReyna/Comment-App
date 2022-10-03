import React, { useContext } from "react";
import $ from "jquery";
import { Context } from "../../Context";
import "../ComFooter.scss";

const ComEdit = (props) => {
  const { comments, setComments, setShowDelete, setIndices } =
    useContext(Context);
  const { id, username, currUser, indexCom, indexRep } = props;

  const startDelete = (indexCom, indexRep) => {
    setShowDelete((c) => (c = true));
    setIndices([indexCom, indexRep]);
  };

  const handleEdit = (item) => {
    const comSelector = "#" + item + " > .content";
    const heightCom = $(comSelector + "> .com-con").height();

    $(comSelector).toggleClass("editable");
    $(comSelector + "> textarea").innerHeight(heightCom - 2);

    $("#" + item + "> .edit-reply > .edit").toggleClass("inactive");
    $("#" + item + "> .update-button").toggleClass("active");
  };

  const saveChanges = (item, indexCom, indexRep) => {
    const commentsCopy = [...comments];
    const newVal = $("#" + item + "> .content > textarea").val();

    if (indexRep !== null) {
      commentsCopy[0].comments[indexCom].replies[indexRep].content = newVal;
    } else {
      commentsCopy[0].comments[indexCom].content = newVal;
    }

    setComments([...commentsCopy]);
    handleEdit(item, indexRep);
  };

  const startReply = (id) => {
    $("#reply" + id).toggleClass("inactive");
  };

  return (
    <>
      <div className="edit-reply">
        {username === currUser ? (
          <div className="edit">
            <button
              className="delete"
              onClick={() => startDelete(indexCom, indexRep)}
            >
              <svg
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                alt="delete comment"
              >
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="currentColor"
                />
              </svg>{" "}
              Delete
            </button>
            <button className="edit-button" onClick={() => handleEdit(id)}>
              <svg
                width="14"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                alt="edit comment"
              >
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="currentColor"
                />
              </svg>{" "}
              Edit
            </button>
          </div>
        ) : (
          <button className="reply-button" onClick={() => startReply(id)}>
            <svg
              width="14"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
              alt="reply to user"
            >
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="currentColor"
              />
            </svg>
            Reply
          </button>
        )}
      </div>
      <button
        className="update-button"
        onClick={() => saveChanges(id, indexCom, indexRep)}
      >
        Update
      </button>
    </>
  );
};

export default ComEdit;
