import React from "react";

function RepliesList({
  IconPlus,
  IconMinus,
  IconReply,
  IconEdit, IconDelete,
  score,
  username,
  createdAt,
  replyBox,
  comment,
  vote,
  setScore,
  setVote,
  avatar,
}) {
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
          <div className="flex justify-between w-full h-[4dvw">
            <span className="flex items-center gap-[1dvw] w-fit">
              <img src={avatar} alt="img" />
              <p className="w-fit font-bold pointer">{username}</p>
              <p className="w-fit text-grey500 text-shadow-2xs">{createdAt}</p>
            </span>
            <p
              className={`pointer font-medium flex items-center gap-[0.5dvw] w-fit group hover:text-purple200 text-purple600`}
              onClick={replyBox}
            >
                {username!=="juliusomo" &&
                 <>
                    <IconReply className="icon3 fill-current group-hover:fill-purple200" />
              Reply </>}  
            </p>
            <p className={`font-medium flex items-center w-fit ${username!=="juliusomo"?"hidden":"block"}`}>
            {username==="juliusomo" && <div className="flex gap-[3vw]">
                <div className="pointer flex items-center gap-[0.3vw] group hover:text-pink200 text-pink400"><IconDelete className="icon3 fill-current group-hover:fill-pink200" /> Delete</div> 
                <div className="pointer flex items-center gap-[0.3vw] group text-purple600 hover:text-purple200"><IconEdit className="icon3 fill-current group-hover:fill-purple200" /> Edit</div>
                </div>
                }
            </p>
          </div>
          <p id="comments" className="w-full">
            {comment}
          </p>
        </div>
      </div>
    </>
  );
}

export default RepliesList;
