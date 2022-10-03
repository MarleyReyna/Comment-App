import React, { useContext } from "react";
import { Context } from "../Context";
import ComHeader from "./Components/ComHeader";
import ComBody from "./Components/ComBody";
import ComUpvote from "./Components/ComUpvote";
import ComEdit from "./Components/ComEdit";
import ReplyModal from "./Components/ReplyModal";
import "./Main.scss";

const Main = () => {
  const { comments } = useContext(Context);

  return (
    <main>
      <ul>
        {comments[0].comments.map((item, indexCom) => {
          return (
            <li key={indexCom}>
              <section className="main-comment" id={item.id}>
                <ComHeader
                  pfp={item.user.image.png}
                  username={item.user.username}
                  currUser={comments[0].currentUser.username}
                  createAt={item.createdAt}
                />
                <ComBody
                  content={item.content}
                  username={item.user.username}
                  currUser={comments[0].currentUser.username}
                  indexRep={null}
                  replyTo={null}
                />
                <ComUpvote
                  score={item.score}
                  indexCom={indexCom}
                  indexRep={null}
                />
                <ComEdit
                  id={item.id}
                  username={item.user.username}
                  currUser={comments[0].currentUser.username}
                  indexCom={indexCom}
                  indexRep={null}
                />
              </section>
              {item.user.username !== comments[0].currentUser.username ? (
                <ReplyModal
                  id={"reply" + item.id}
                  indexCom={indexCom}
                  indexRep={null}
                />
              ) : (
                <div style={{ display: "none" }} />
              )}
              <section
                className={
                  item.replies.length === 0 ? "replies" : "replies active"
                }
              >
                {item.replies.map((item, indexRep) => {
                  return (
                    <React.Fragment key={indexRep}>
                      <div className="reply" id={item.id}>
                        <ComHeader
                          pfp={item.user.image.png}
                          username={item.user.username}
                          currUser={comments[0].currentUser.username}
                          createAt={item.createdAt}
                        />
                        <ComBody
                          content={item.content}
                          username={item.user.username}
                          currUser={comments[0].currentUser.username}
                          indexRep={indexRep}
                          replyTo={item.replyingTo}
                        />
                        <ComUpvote
                          score={item.score}
                          indexCom={indexCom}
                          indexRep={indexRep}
                        />
                        <ComEdit
                          id={item.id}
                          username={item.user.username}
                          currUser={comments[0].currentUser.username}
                          indexCom={indexCom}
                          indexRep={indexRep}
                        />
                      </div>
                      {item.user.username !==
                      comments[0].currentUser.username ? (
                        <ReplyModal
                          id={"reply" + item.id}
                          indexCom={indexCom}
                          indexRep={indexRep}
                        />
                      ) : (
                        <div style={{ display: "none" }} />
                      )}
                    </React.Fragment>
                  );
                })}
              </section>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Main;
