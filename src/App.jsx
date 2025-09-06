import { useEffect, useState } from "react";
import "./App.css";
import IconPlus from "./assets/icon-plus.svg?react";
import IconMinus from "./assets/icon-minus.svg?react";
import IconReply from "./assets/icon-reply.svg?react";
import IconDelete from "./assets/icon-delete.svg?react";
import IconEdit from "./assets/icon-edit.svg?react";
import CommentCard from "./components/CommentCard";
import NewComment from "./components/NewComment";


function App() {
  

  
  const [usersdata, setUsersdata] = useState(() => {
    const stored = localStorage.getItem("usersdata");
    return stored ? JSON.parse(stored) : null;
  });



  function sortComments(comments, isTopLevel = true) {
    const sorted = comments.slice().sort((a, b) => {
      return isTopLevel
        ? b.score - a.score // top-level: score desc
        : new Date(a.createdAt) - new Date(b.createdAt); // replies: time asc
    });
  
    return sorted.map(c => ({
      ...c,
      replies: sortComments(c.replies || [], false)
    }));
  }
  function onUpdate(commentId, newComment, time= new Date().toISOString()) {
    setUsersdata((prev)=> {
      const updatedComment= (comments)=>comments.map((comment)=>{
        if (comment.id===commentId) {
          return {
            ...comment,
            content: newComment,
            createdAt: time
          }
        }
        if (comment.replies?.length) {
          return {
            ...comment, replies: updatedComment(comment.replies)
          }
        }
        return comment
      })
      const updated= {...prev, comments: updatedComment(prev.comments)}
      localStorage.setItem("usersdata", JSON.stringify(updated))
      return updated
    })
    
  }

  function addReplyToComment(comments, targetId, newReply) {
    return comments.map(comment => {
      if (comment.id === targetId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      if (comment.replies?.length) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, targetId, newReply)
        };
      }
      return comment;
    });
  }
  function deleteReplyToComment(comments, targetId) {
    return comments?.filter(comment => comment.id !== targetId) // remove match at this level
      .map(comment => ({
        ...comment,
        replies: deleteReplyToComment(comment.replies, targetId) // recurse
      }));
  }
  

  const handleDeleteComment = (targetId) => {
    setUsersdata(prev => {
      const updated = {
        ...prev,
        comments: deleteReplyToComment(prev.comments, targetId)
      };
      localStorage.setItem("usersdata", JSON.stringify(updated));
      return updated;
    });
  };
  

  // ✅ Minimal recursive vote handler
  const handleVote = (id, direction) => {
    setUsersdata((prev) => {
      const updateScores = (comments) =>
        comments.map((c) => {
          if (c.id === id) {
            const newVote = direction === "up" ? 1 : -1;
            const delta = newVote - (c.vote || 0);
            return { ...c, score: c.score + delta, vote: newVote };
          }
          return { ...c, replies: updateScores(c.replies || []) };
        });

      const updated = { ...prev, comments: updateScores(prev.comments) };
      localStorage.setItem("usersdata", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Load data.json only if there's no saved state
  useEffect(() => {
    if (!usersdata) {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          setUsersdata(data);
          localStorage.setItem("usersdata", JSON.stringify(data));
        })
        .catch((err) => console.log(err));
    }
  }, [usersdata]);

  return (
    <div className={`dark:bg-grey400 bg-grey50 w-screen !max-w-[100vw] min-h-screen flex justify-center transition-all duration-300 ease-linear`}>
      
      <div className="flex flex-col items-center desktop:gap-[1.5vw] gap-[4vw] desktop:pt-[5vw] pt-[15vw] desktop:w-[52%] w-[92%] ">
        {usersdata ? (
          
          sortComments(usersdata.comments).map((c) => (
            
                 <CommentCard
              key={c.id}
              {...{
              ID: c.id,
              IconPlus,
              IconMinus,
              IconReply,
              IconDelete,
              IconEdit,
              setUsersdata,
              handleVote, 
              score:c.score,
              vote:c.vote || 0,
              avatar:c.user.image.webp,
              username:c.user.username,
              createdAt:c.createdAt,
              replyingTo:c.replyingTo,
              comment:c.content,
              addReplyToComment,       
              deleteReplyToComment,
              onUpdate,
              handleDeleteComment,
              replies:c.replies,
              usersdata,
              currentUser:usersdata.currentUser.username,
              
              sortComments
              }}
            />
            
          ))
          
          ) : (
            <p></p>
            )}
            {usersdata?
             <NewComment key={""} {...{ usersdata,setUsersdata}}/>:""
            }

            
        
      </div>
    </div>
  );
}

export default App;
