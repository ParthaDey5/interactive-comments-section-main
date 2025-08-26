import { useEffect, useRef, useState } from "react";
import "./App.css";
import IconPlus from "./assets/icon-plus.svg?react";
import IconMinus from "./assets/icon-minus.svg?react";
import IconReply from "./assets/icon-reply.svg?react";
import IconDelete from "./assets/icon-delete.svg?react";
import IconEdit from "./assets/icon-edit.svg?react";
import CommentCard from "./components/CommentCard";
import RepliesList from "./components/RepliesList";

function App() {
  const [usersdata, setUsersdata] = useState();

  const [isreply, setIsreply] = useState(false);
  const [vote, setVote] = useState(() => {
    const stored = localStorage.getItem("vote");
    return stored ? JSON.parse(stored) : 0; // 0 = no vote, 1 = up, -1 = down
  });

  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore ? JSON.parse(storedScore) : "";
  });

  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("vote", JSON.stringify(vote));
  }, [score, vote]);

  const replyBox = () => {
    setIsreply(true);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setUsersdata(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Users data updated:", usersdata);
  }, [usersdata]);

  return (
    <>
      <div className="w-[100vw] min-h-screen flex justify-center">
        <div className="flex flex-col items-center gap-[1vw] pt-[5dvw] w-[52%]">
          {usersdata ? (
            <>
              {usersdata.comments.map((c) => (
                <CommentCard
                  key={c.id}
                  IconPlus={IconPlus}
                  IconMinus={IconMinus}
                  IconReply={IconReply}
                  score={c.score}
                  setScore={setScore}
                  setVote={setVote}
                  vote={vote}
                  avatar={c.user.image.webp}
                  username={c.user.username}
                  createdAt={c.createdAt}
                  replyBox={replyBox}
                  comment={c.content}
                />
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
           
          <div className="flex justify-end w-full">
          <div className="bg-white100 w-[90%] h-[10vw] gap-[1vw] flex flex-col items-end mt-[0.5vw] rounded-[0.7vw]">
            {usersdata ? (
              <>
                {usersdata.comments.map((c) =>
                  c.replies.map((e) => (
                    <RepliesList
                    key={e.id}
                    IconPlus={IconPlus}
                    IconMinus={IconMinus}
                    IconReply={IconReply}
                    IconDelete={IconDelete}
                    IconEdit={IconEdit}
                    score={e.score}
                      setScore={setScore}
                      setVote={setVote}
                      vote={vote}
                      avatar={e.user.image.webp}
                      username={e.user.username}
                      createdAt={e.createdAt}
                      replyBox={replyBox}
                      comment={e.content}
                    />
                  ))
                )}
              </>
            ) : (
              ""
              )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
