import React, { useState, useEffect } from "react";
import { format } from "timeago.js";


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
  replyingTo,
  addReplyToComment,
  onUpdate,
  deleteReplyToComment,
  dark, sortComments
}) {
  const [draft, setDraft] = useState(comment);
  const [replyText, setReplyText] = useState("");
  const [editReply, setEditreply] = useState(false);
  const [newReply, setNewreply] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  function isISODate(value) {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value);
  }

  return (
    <>
      {/* Delete Modal */}
      {pendingDeleteId && (
        <div className="fixed top-0 right-0 !bg-dark100 w-[100vw] h-screen z-[99999]">
          <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 desktop:rounded-[0.6vw] rounded-[2.5vw] desktop:w-[20vw] w-[90vw] bg-white100 desktop:p-[1.5vw] p-[6vw] animate-pop">
            <span className="h-full flex flex-col justify-between desktop:gap-[1vw] gap-[3vw]">
              <p className="font-bold extraBigTxt">Delete comment</p>
              <p className="desktopallTxt">
                Are you sure you want to delete this comment? This will remove
                the comment and can't be undone.
              </p>
              <span className="flex justify-between">
                <button
                  className="bg-purple600 button2"
                  onClick={() => setPendingDeleteId(false)}
                >
                  <span className="w-fit brightness-200">NO, CANCEL</span>
                </button>
                <button
                  className="bg-pink400 button2"
                  onClick={() => {
                    handleDeleteComment(ID);
                  }}
                >
                  <span className="w-fit brightness-200">YES, DELETE</span>
                </button>
              </span>
            </span>
          </span>
        </div>
      )}
       
      {/* Comment Card */}
      <div className={`w-full relative flex gap-[1.5vw] desktop:p-[1.8vw] px-[3vw] py-[5vw] ${dark?"bg-grey200":"bg-white100"} desktop:rounded-[0.7vw] rounded-[2vw] transition-all duration-300 ease-linear`}>
        {/* Vote buttons */}
        <div className="desktop:hidden absolute bottom-0 flex justify-between h-fit px-[1.5vw] pb-[4vw]">
          <div className={`${dark?"bg-grey100":"bg-grey50"} desktop:hidden w-[22vw] h-[9vw] rounded-[1.5vw] py-[0.8vw] px-[3vw] transition-all duration-200 ease-linear`}>
            <span className="h-full flex flex-row justify-between !items-center">
              <IconPlus
                className="icon pointer fill-purple200 hover:fill-purple600"
                onClick={() => handleVote(ID, "up")}
              />
              <p className="vote">{score}</p>
              <IconMinus
                className="icon pointer fill-purple200 hover:fill-purple600"
                onClick={() => handleVote(ID, "down")}
              />
            </span>
          </div>
        </div>

        {/* Reply button */}
        <span
          className="pointer font-medium desktop:hidden absolute bottom-0 right-0 gap-[0.5vw] group hover:text-purple200 text-purple600  px-[5vw] py-[5vw]"
          onClick={() => {
            setNewreply(true);
          }}
        >
          <p
            className={`flex items-center desktop:gap-[0.5vw] gap-[1.2vw] ${
              username === currentUser ? "hidden" : "block"
            }`}
          >
            <IconReply className="icon3 fill-current group-hover:fill-purple200" />
            Reply
          </p>
        </span>

        {/* Vote buttons */}
        <div className="!relative flex justify-between ">
          <div className={`${dark?"bg-grey100":"bg-grey50"} desktop:relative desktop:!flex desktop:!flex-col desktop:!justify-between desktop:!items-center hidden desktop:!w-[2.7vw] w-[26vw] desktop:h-[6.5vw] h-[10vw] desktop:rounded-[0.5vw] rounded-[1.5vw] py-[0.8vw] desktop:px-0 px-[4vw] transition-all duration-200 ease-linear`}>
            <span className="h-full flex desktop:flex-col flex-row justify-between !items-center">
              <IconPlus
                className="icon pointer fill-purple200 hover:fill-purple600"
                onClick={() => handleVote(ID, "up")}
              />
              <p className="vote">{score}</p>
              <IconMinus
                className="icon pointer fill-purple200 hover:fill-purple600"
                onClick={() => handleVote(ID, "down")}
              />
            </span>
          </div>
        </div>

        {/* Comment content */}
        <div className="flex flex-col w-full desktop:gap-[0.8vw] gap-[4vw]">
          <div className="flex justify-between w-full">
            <span className="flex items-center desktop:gap-[1vw] gap-[4vw] w-fit ">
              <img src={avatar} alt="img" />
              <p className="w-fit font-bold pointer">{username}</p>
              <p className="whitespace-nowrap mediumTxt w-fit text-grey500 text-shadow-2xs">
                {isISODate(createdAt) ? format(createdAt) : createdAt}
              </p>
            </span>

            {/* Reply button */}

            <span
              className="pointer font-medium desktop:relative desktop:flex desktop:items-center hidden gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600 "
              onClick={() => setNewreply(true)}
            >
              <p
                className={`flex items-center desktop:gap-[0.5vw] gap-[1.2vw] ${
                  username === currentUser ? "hidden" : "block"
                }`}
              >
                <IconReply className="icon3 fill-current group-hover:fill-purple200" />
                Reply
              </p>
            </span>

            {/* Edit/Delete for current user */}
            <div
              className={`desktop:p-0 py-[5vw] pr-[4.4vw] desktop:relative absolute bottom-0 right-0 pointer font-medium desktop:flex items-center gap-[0.5dvw] w-fit hover:text-purple200 text-purple600 ${
                username === currentUser ? "block" : "!hidden"
              }`}
            >
              <div className="flex desktop:gap-[2vw] gap-[4vw]">
                <p
                  className={`pointer flex items-center gap-[0.3vw] group ${dark?"text-pink600 hover:text-pink400":"text-pink400 hover:text-pink200"}`}
                  onClick={() => {
                    setPendingDeleteId(ID);
                  }}
                >
                  <IconDelete className={`icon3 fill-current ${dark?"group-hover:fill-pink400":"group-hover:fill-pink200"}`} />
                  Delete
                </p>
                <p className="pointer flex items-center gap-[0.3vw] group text-purple600 hover:text-purple200" onClick={() => {
                  setEditreply(true)
                  comment
                  }}>
                  <IconEdit className="icon3 fill-current group-hover:fill-purple200" />
                  Edit
                </p>
              </div>
            </div>
          </div>

          {/* Comment text */}
          {editReply? <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}     
          className="h-[8vw]">{comment}</textarea> :
          <div>
            <p id="comments" className="w-full desktop:mb-0 mb-[14vw]">
              <a href="#">
                <b>
                  {replyingTo ? "@" : ""}
                  {replyingTo}
                </b>
              </a>{" "}
              {comment}
            </p>
          </div>
         }
         {editReply &&
         <div className="w-full flex justify-end">
         <button className="mediumTxt bg-purple600 !text-grey500 !w-fit !h-fit desktop:px-[1.7vw] px-[4vw] desktop:py-[1vw] py-[2vw] hover:bg-purple200 desktop:block hidden"  onClick={()=>{
           onUpdate(ID, draft, new Date().toISOString()); // send updated text to parent
          setEditreply(false)}}>UPDATE</button>
         </div>}
        </div>
      </div>

      {/* New replies */}
      {newReply && (
        <div className={`desktop:rounded-[0.7vw] rounded-[1.7vw] w-full ${dark?"bg-grey50":"bg-white100"} desktop:h-[11vw] h-[50vw] desktop:p-[1.8vw] p-[4vw] relative flex justify-between gap-[1vw]`}>
          <div className="relative">
            <span className="w-fit desktop:relative desktop:flex hidden">
              <img src={usersdata.currentUser.image.webp} alt="currentUser" />
            </span>
          </div>
          <div className="absolute bottom-0 mb-[5vw]">
            <span className="w-fit desktop:hidden block">
              <img src={usersdata.currentUser.image.webp} alt="currentUser" />
            </span>
          </div>
          <textarea
          className={`${(ID===1 || ID===2)?"desktop:w-[36vw] w-[80vw]":"desktop:w-[31vw] w-[80vw]"} ${dark?"border-grey200":"border-grey100"} transition-all duration-300 ease-linear`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a comment..."
          />
          <div className="relative">
            <button
              onClick={() => {
                if (!replyText.trim()) return;
                const replyObj = {
                  id: Date.now(),
                  content: replyText,
                  createdAt: new Date().toISOString(),
                  score: 0,
                  vote: 0,
                  replyingTo: username,
                  user: usersdata.currentUser,
                  replies: [],
                };
                const updated = {
                  ...usersdata,
                  comments: addReplyToComment(usersdata.comments, ID, replyObj),
                };
                setUsersdata(updated);
                localStorage.setItem("usersdata", JSON.stringify(updated));

                setReplyText("");

                setNewreply(false);
              }}
              className="mediumTxt bg-purple600 no-scrollbar desktop:px-[1.7vw] px-[4vw] desktop:py-[1vw] py-[2vw] hover:bg-purple200 desktop:block hidden"
            >
              REPLY
            </button>
          </div>

          <div className="absolute bottom-0 right-0 pb-[4vw] pr-[4vw]">
            <button
              onClick={() => {
                if (!replyText.trim()) return;
                const replyObj = {
                  id: Date.now(),
                  content: replyText,
                  createdAt: new Date().toISOString(),
                  score: 0,
                  vote: 0,
                  replyingTo: username,
                  user: usersdata.currentUser,
                  replies: [],
                };
                const updated = {
                  ...usersdata,
                  comments: addReplyToComment(usersdata.comments, ID, replyObj),
                };
                setUsersdata(updated);
                localStorage.setItem("usersdata", JSON.stringify(updated));

                setReplyText("");

                setNewreply(false);
              }}
              className="mediumTxt bg-purple600 desktop:px-[1.7vw] px-[4vw] desktop:py-[0.8vw] py-[2vw] hover:bg-purple200 desktop:hidden block"
            >
              REPLY
            </button>
          </div>
        </div>
      )}

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="flex justify-end w-full">
          <div className={`border-l-2 ${dark?"border-l-grey300":"border-l-grey100"} flex justify-end w-[95%] transition-all duration-200 ease-linear`}>
            <div className="w-[93%] gap-[1vw] flex flex-col items-end desktop:my-0 my-[2vw] rounded-[0.7vw]">
              {sortComments(replies).map((reply) => (
                <CommentCard
                  key={reply?.id}
                  {...{ID:reply?.id,
                  IconPlus,
                  IconMinus,
                  IconReply,
                  IconDelete,
                  IconEdit,
                  score:reply?.score,
                  vote:reply?.vote || 0,
                  avatar:reply?.user.image.webp,
                  username:reply?.user.username,
                  createdAt:reply?.createdAt,
                  comment:reply?.content,
                  replies:reply?.replies,
                  currentUser:usersdata.currentUser.username,
                  handleVote,
                  setUsersdata,
                  usersdata,
                  replyingTo:reply?.replyingTo,
                  addReplyToComment,
                  onUpdate,
                  deleteReplyToComment,
                  handleDeleteComment,
                dark, sortComments}}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

export default CommentCard;
