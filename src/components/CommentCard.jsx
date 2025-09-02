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
  replyingTo,
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
        <div className="fixed top-0 right-0 !bg-dark100 w-[100vw] h-screen z-[99999]">
          <span className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-[0.5vw] w-[20vw] aspect-[5/3] bg-white100 p-[1.5vw] animate-pop">
            <span className="h-full flex flex-col justify-between gap-0">
              <p className="font-bold">Delete comment</p>
              <p className="desktopallTxt">
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
      <div className="w-full relative flex gap-[1.5vw] desktop:p-[1.8vw] px-[3vw] py-[5vw] bg-white100 desktop:rounded-[0.7vw] rounded-[2vw]">

        {/* Vote buttons */}
        <div className="desktop:hidden absolute bottom-0 flex justify-between h-fit px-[1.5vw] pb-[4vw]">
        <div className="bg-grey50 desktop:hidden w-[22vw] h-[9vw] rounded-[1.5vw] py-[0.8vw] px-[3vw]">
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
              onClick={() => {setNewreply(true)}}
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
        <div className="bg-grey50 desktop:relative desktop:!flex desktop:!flex-col desktop:!justify-between desktop:!items-center hidden desktop:!w-[2.7vw] w-[26vw] desktop:h-[6.5vw] h-[10vw] desktop:rounded-[0.5vw] rounded-[1.5vw] py-[0.8vw] desktop:px-0 px-[4vw]">
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
              <p className="w-fit text-grey500 text-shadow-2xs">
                {isISODate(createdAt) ? format(createdAt) : createdAt}
              </p>
            </span>

            {/* Reply button */}
            
            <span
              className="pointer font-medium desktop:relative desktop:flex desktop:items-center hidden gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600 bg-amber-400"
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
            <p id="comments" className="w-full desktop:mb-0 mb-[14vw]">
              <a href=""><b>{replyingTo?"@":""}{replyingTo}</b></a>{" "}{comment}
            </p>
          </div>

        </div> 
          
      </div>

      {/* New replies */}
      {newReply && (
        <div className="desktop:rounded-[0.7vw] rounded-[1.7vw] w-full bg-white100 desktop:h-[10vw] h-[50vw] desktop:p-[1.8vw] p-[4vw] flex justify-between gap-[1vw]">
          <div className="relative">
          <span className="desktop:w-[3vw] w-fit desktop:relative desktop:flex absolute bottom-0">
            <img src={usersdata.currentUser.image.webp} alt="currentUser" />
          </span>
          </div>
          <textarea
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
                replies: []
              };
              const updated ={
                ...usersdata, 
                comments: addReplyToComment(usersdata.comments, ID, replyObj)
              }
              setUsersdata(updated)
              localStorage.setItem("usersdata", JSON.stringify(updated));
              
              setReplyText("");
              
              setNewreply(false);
              
            }}
            className="mediumTxt bg-purple600 !w-fit !h-fit desktop:px-[1.7vw] px-[4vw] desktop:py-[0.8vw] py-[2vw] desktop:!rounded-[0.55vw] !rounded-[1.1vw] hover:bg-purple200 desktop:relative absolute bottom-0 right-0"
            >
            REPLY
          </button>
            </div>
        </div>
      )}

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="flex justify-end w-full">

        <div className="border-l-2 border-l-grey100 flex justify-end w-[95%]">
          <div className="w-[93%] gap-[1vw] flex flex-col items-end mt-[0.5vw] rounded-[0.7vw]">
            {replies.map((reply) => (
              <CommentCard
                key={reply?.id}
                ID={reply?.id}
                IconPlus={IconPlus}
                IconMinus={IconMinus}
                IconReply={IconReply}
                IconDelete={IconDelete}
                IconEdit={IconEdit}
                score={reply?.score}
                vote={reply?.vote || 0}
                avatar={reply?.user.image.webp}
                username={reply?.user.username}
                createdAt={reply?.createdAt}
                comment={reply?.content}
                replies={reply?.replies}
                currentUser={usersdata.currentUser.username}
                handleVote={handleVote}
                setUsersdata={setUsersdata}
                usersdata={usersdata}
                replyingTo={reply?.replyingTo}
                addReplyToComment={addReplyToComment}
                deleteReplyToComment={deleteReplyToComment}
                handleDeleteComment={handleDeleteComment}
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
