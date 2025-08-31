import React, { useState, useEffect } from "react";
import { format } from 'timeago.js';

function CommentCard({
  ID,
  IconPlus,
  IconMinus,
  IconReply,
  IconDelete,
  IconEdit,
  score,
  username,
  replies = [],
  createdAt,
  comment,
  vote = 0,
  avatar,
  currentUser,
  handleVote,      
  handleDeleteComment,
  setUsersdata,    
  usersdata,
  
  addReplyToComment,
  deleteReplyToComment
}) {
  const [replyText, setReplyText] = useState("");
  const [newReply, setNewreply] = useState(false);  
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  

  function isISODate(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value);
  }
  
  return (
    <>
      {/* Delete Modal */}
      {pendingDeleteId && (
        <div className="fixed top-0 right-0 !bg-dark100 w-[100vw] h-screen">
          <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-[0.5vw] w-[20vw] aspect-[5/3] bg-white100 p-[1.5vw] animate-pop">
            <span className="h-full flex flex-col justify-between gap-0">
              <p className="font-bold">Delete comment</p>
              <p className="smallTxt">
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
              </p>
              <span className="flex justify-between">
                <button className="bg-purple600" onClick={() => setPendingDeleteId(false)}>
                  NO, CANCEL
                </button>
                <button
                  className="bg-pink400"
                  onClick={() => {
                    handleDeleteComment(ID);
                    console.log(ID);
                    
                  }}
                >
                  YES, DELETE
                </button>
              </span>
            </span>
          </span>
        </div>
      )}

      {/* Comment Card */}
      <div className="w-full flex gap-[1.5dvw] p-[1.8vw] bg-white100 rounded-[0.7vw]">
        {/* Vote buttons */}
        <div className="bg-grey50 flex flex-col justify-between items-center w-[5.6dvw] h-[6.5vw] rounded-[0.5dvw] py-[0.8dvw]">
          <IconPlus
            className="icon pointer fill-purple200 hover:fill-purple600"
            onClick={() => handleVote(ID, "up")}
          />
          <p className="vote">{score}</p>
          <IconMinus
            className="icon pointer fill-purple200 hover:fill-purple600"
            onClick={() => handleVote(ID, "down")}
          />
        </div>

        {/* Comment content */}
        <div className="flex flex-col gap-[0.8vw]">
          <div className="flex justify-between w-full">
            <span className="flex items-center gap-[1dvw] w-fit">
              <img src={avatar} alt="img" />
              <p className="w-fit font-bold pointer">{username}</p>
              <p className="w-fit text-grey500 text-shadow-2xs">
                {isISODate(createdAt) ? format(createdAt) : createdAt}
              </p>
            </span>

            {/* Reply button */}
            <span
              className="pointer font-medium flex items-center gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600"
              onClick={() => setNewreply(true)}
            >
              <p
                className={`flex items-center gap-[0.5vw] ${
                  username === currentUser ? "hidden" : "block"
                }`}
              >
                <IconReply className="icon3 fill-current group-hover:fill-purple200" />
                Reply
              </p>
            </span>

            {/* Edit/Delete for current user */}
            <div
              className={`pointer font-medium flex items-center gap-[0.5dvw] w-fit hover:text-purple200 text-purple600 ${
                username === currentUser ? "block" : "hidden"
              }`}
            >
              <div className="flex gap-[3vw]">
                <p
                  className="pointer flex items-center gap-[0.3vw] group hover:text-pink200 text-pink400"
                  onClick={() => {
                    setPendingDeleteId(ID);
                    
                  }}
                >
                  <IconDelete className="icon3 fill-current group-hover:fill-pink200" />
                  Delete
                </p>
                <p className="pointer flex items-center gap-[0.3vw] group text-purple600 hover:text-purple200">
                  <IconEdit className="icon3 fill-current group-hover:fill-purple200" />
                  Edit
                </p>
              </div>
            </div>
          </div>

          {/* Comment text */}
          <div>
            <p id="comments" className="w-full">
              {comment}
            </p>
          </div>
        </div>
      </div>

      {/* New replies */}
      {newReply && (
        <div className="rounded-[0.6vw] w-full bg-white100 h-[10vw] p-[1.8vw] flex justify-between gap-[1vw]">
          <span className="w-[3vw]">
            <img src={usersdata.currentUser.image.webp} alt="currentUser" />
          </span>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a reply..."
          />
          <button
            onClick={() => {
              if (!replyText.trim()) return;
              const replyObj = {
                id: Date.now(),
                content: replyText,
                createdAt: new Date().toISOString(),
                score: 0,
                vote: 0,
                user: usersdata.currentUser,
                replies: []
              };
              setUsersdata(prev => ({
                ...prev,
                comments: addReplyToComment(prev.comments, ID, replyObj)
              }));
              setReplyText("");
              setNewreply(false);
            }}
            className="mediumTxt bg-purple600 !w-fit !h-fit px-[1.7vw] py-[0.8vw] !rounded-[0.55vw] hover:bg-purple200"
          >
            REPLY
          </button>
        </div>
      )}

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="flex justify-end w-full">
          <div className="w-[90%] gap-[1vw] flex flex-col items-end mt-[0.5vw] rounded-[0.7vw]">
            {replies.map((reply) => (
              <CommentCard
                key={reply.id}
                ID={reply.id}
                IconPlus={IconPlus}
                IconMinus={IconMinus}
                IconReply={IconReply}
                IconDelete={IconDelete}
                IconEdit={IconEdit}
                score={reply.score}
                vote={reply.vote || 0}
                avatar={reply.user.image.webp}
                username={reply.user.username}
                createdAt={reply.createdAt}
                comment={reply.content}
                replies={reply.replies}
                currentUser={usersdata.currentUser.username}
                handleVote={handleVote}
                setUsersdata={setUsersdata}
                usersdata={usersdata}

                addReplyToComment={addReplyToComment}
                deleteReplyToComment={deleteReplyToComment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CommentCard;
