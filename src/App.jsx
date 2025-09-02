import { useEffect, useState } from "react";
import "./App.css";
import IconPlus from "./assets/icon-plus.svg?react";
import IconMinus from "./assets/icon-minus.svg?react";
import IconReply from "./assets/icon-reply.svg?react";
import IconDelete from "./assets/icon-delete.svg?react";
import IconEdit from "./assets/icon-edit.svg?react";
import CommentCard from "./components/CommentCard";

function App() {
  const [usersdata, setUsersdata] = useState(() => {
    const stored = localStorage.getItem("usersdata");
    return stored ? JSON.parse(stored) : null;
  });




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
    <div className="w-screen !max-w-[100vw] min-h-screen flex justify-center">
      <div className="flex flex-col items-center desktop:gap-[1vw] gap-[4vw] pt-[5dvw] desktop:w-[52%] w-[92%] ">
        {usersdata ? (
          usersdata.comments.map((c) => (
            <CommentCard
              key={c.id}
              ID={c.id}
              IconPlus={IconPlus}
              IconMinus={IconMinus}
              IconReply={IconReply}
              IconDelete={IconDelete}
              IconEdit={IconEdit}
              setUsersdata={setUsersdata}
              handleVote={handleVote} // ✅ Pass unified vote handler
              score={c.score}
              vote={c.vote || 0}
              avatar={c.user.image.webp}
              username={c.user.username}
              createdAt={c.createdAt}
              replyingTo={c.replyingTo}
              comment={c.content}
              addReplyToComment={addReplyToComment}       
              deleteReplyToComment= {deleteReplyToComment}
              handleDeleteComment={handleDeleteComment}
              replies={c.replies}
              usersdata={usersdata}
              currentUser={usersdata.currentUser.username}
              
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
