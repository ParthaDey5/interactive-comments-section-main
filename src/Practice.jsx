import React from "react";

function Practice() {
  const comments = [
    {
      id: 1,
      text: "Root comment",
      replies: [{ id: 2, text: "First reply", replies: [] }],
    },
  ];

  
function addReplyToComment(comments, targetId, newReply) {
  return comments.map((comment)=>{
    if (comment.id=== targetId) {
      return {...comment,replies: [...(comment.replies || []), newReply] };  
    }
return {
    ...comment, 
    replies: addReplyToComment(comment.replies, targetId, newReply)}  
  })
  
}

  return <></>;
}

export default Practice;
