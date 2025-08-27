import React from "react";

function CommentCard({
  IconPlus,
  IconMinus,
  IconReply,
  IconDelete,
  IconEdit,
  score,
  username,
  replies,
  createdAt,
  replyBox,
  comment,
  vote,
  setScore,
  setVote,
  avatar,
  currentUser,
}) {
  console.log(currentUser);
  return (
    <>
      <div className="w-full flex gap-[1.5dvw] px-[1.5dvw] py-[1.8dvw] bg-white100 rounded-[0.7vw]">
        <div className="bg-grey50 flex flex-col justify-between items-center w-[5.6dvw] h-[6.5vw] rounded-[0.5dvw] py-[0.8dvw]">
          <IconPlus
            className="icon pointer fill-purple200 hover:fill-purple600"
            onClick={() => {
              if (vote !== 1) {
                setScore(score + (vote === -1 ? 2 : 1));
                setVote(1);
              }
            }}
          />
          <p className="vote">{score}</p>
          <IconMinus
            className="icon pointer fill-purple200 hover:fill-purple600"
            onClick={() => {
              if (vote !== -1) {
                setScore(score - (vote === 1 ? 2 : 1));
                setVote(-1);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-[0.8vw]">
          <div className="flex justify-between w-full h-[4dvw]">
            <span className="flex items-center gap-[1dvw] w-fit">
              <img src={avatar} alt="img" />
              <p className="w-fit font-bold pointer">{username}</p>
              <p className="w-fit text-grey500 text-shadow-2xs">{createdAt}</p>
            </span>
            <p
              className={`pointer font-medium flex items-center gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600`}
              onClick={replyBox}
            >
              <>
                <IconReply className="icon3 fill-current group-hover:fill-purple200" />
                Reply{" "}
              </>
            </p>
          </div>
          <div>
            <p id="comments" className="w-full">
              {comment}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`flex justify-end w-full ${
          replies.length > 0 ? "block" : "hidden"
        }`}
      >
        <div className="bg-white100 w-[90%] h-[10vw] gap-[1vw] flex flex-col items-end mt-[0.5vw] rounded-[0.7vw]">
          {replies.length > 0
            ? replies.map((e) => (
                <div
                  key={e.id}
                  className="w-full flex gap-[1.5dvw] px-[1.5dvw] py-[1.8dvw] bg-white100 rounded-[0.7vw]"
                >
                  <div className="bg-grey50 flex flex-col justify-between items-center w-[5.6dvw] h-[6.5vw] rounded-[0.5dvw] py-[0.8dvw]">
                    <IconPlus
                      className="icon pointer fill-purple200 hover:fill-purple600"
                      onClick={() => {
                        if (vote !== 1) {
                          setScore(score + (vote === -1 ? 2 : 1));
                          setVote(1);
                        }
                      }}
                    />
                    <p className="vote">{e.score}</p>
                    <IconMinus
                      className="icon pointer fill-purple200 hover:fill-purple600"
                      onClick={() => {
                        if (vote !== -1) {
                          setScore(score - (vote === 1 ? 2 : 1));
                          setVote(-1);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.8vw]">
                    <div className="flex justify-between w-full h-[4dvw]">
                      <span className="flex items-center gap-[1dvw] w-fit">
                        <img src={e.user.image.webp} alt="img" />
                        <p className="w-fit font-bold pointer">
                          {e.user.username}
                        </p>
                        <p className="w-fit text-grey500 text-shadow-2xs">
                          {e.createdAt}
                        </p>
                      </span>
                      <span
                        className={`pointer font-medium flex items-center gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600`}
                        onClick={replyBox}
                      >
                        <p
                          className={`flex items-center gap-[0.5vw] ${
                            e.user.username === currentUser ? "hidden" : "block"
                          }`}
                        >
                          <IconReply className="icon3 fill-current group-hover:fill-purple200" />
                          Reply
                        </p>
                      </span>
                      <div
                        className={`pointer font-medium flex items-center gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600 ${
                          e?.user?.username === currentUser ? "block" : "hidden"
                        }`}
                        onClick={replyBox}
                      >
                        <div className={`flex gap-[3vw]`}>
                          <p className="pointer flex items-center gap-[0.3vw] group hover:text-pink200 text-pink400">
                            <IconDelete className="icon3 fill-current group-hover:fill-pink200" />
                            Delete
                          </p>
                          <span className="pointer flex items-center gap-[0.3vw] group text-purple600 hover:text-purple200">
                          
                            <IconEdit className="icon3 fill-current group-hover:fill-purple200" />
                        
                            Edit
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p id="comments" className="w-full">
                        {e.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default CommentCard;
