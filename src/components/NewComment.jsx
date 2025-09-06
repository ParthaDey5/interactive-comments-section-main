import React, { useState } from 'react'


function NewComment({setUsersdata,dark,usersdata}) {
    const [draft, setDraft] = useState("");
  return (
    <>
        {/* New replies */}
      {(
        <div className={`desktop:rounded-[0.7vw] rounded-[1.7vw] w-full dark:bg-black bg-white100 desktop:h-[11vw] h-[50vw] desktop:p-[1.8vw] p-[4vw] relative flex justify-between gap-[1vw] desktop:mb-[5vw] mb-[10vw]`}>
          <div className="relative">
            <span className="w-fit desktop:relative desktop:flex hidden">
              <img src={usersdata?.currentUser.image.webp} alt="currentUser" />
            </span>
          </div>
          <div className="absolute bottom-0 mb-[5vw]">
            <span className="w-fit desktop:hidden block">
              <img src={usersdata.currentUser.image.webp} alt="currentUser" />
            </span>
          </div>
          <textarea
          className={`transition-all duration-300 ease-linear`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment..."
    
          />
          <div className="relative">
            <button
              onClick={() => {
                if (!draft.trim()) return;
                setUsersdata(prev => {
                    const newComment = {
                      id: Date.now(),
                      content: draft,
                      createdAt: new Date().toISOString(),
                      score: 0,
                      vote: 0,
                      user: prev.currentUser,
                      replies: []
                    };
                  
                    const updated = {
                      ...prev,
                      comments: [...prev.comments, newComment] // append at end
                    };
                  
                    localStorage.setItem("usersdata", JSON.stringify(updated));
                    return updated;
                  });
                  setDraft("")
                  
              }}
              className="mediumTxt bg-purple600 dark:bg-purple400 no-scrollbar desktop:px-[1.7vw] px-[4vw] desktop:py-[1vw] py-[2vw] hover:bg-purple200 desktop:block hidden"
            >
              SEND
            </button>
          </div>

          <div className="absolute bottom-0 right-0 pb-[4vw] pr-[4vw]">
            <button
              onClick={() => {
                if (!draft.trim()) return;
                setUsersdata(prev => {
                    const newComment = {
                      id: Date.now(),
                      content: draft,
                      createdAt: new Date().toISOString(),
                      score: 0,
                      vote: 0,
                      user: prev.currentUser,
                      replies: []
                    };
                  
                    const updated = {
                      ...prev,
                      comments: [...prev.comments, newComment] // append at end
                    };
                  
                    localStorage.setItem("usersdata", JSON.stringify(updated));
                    return updated;
                  });
                  setDraft("")
                  
              }}
              className="mediumTxt bg-purple600 dark:bg-purple400 no-scrollbar desktop:px-[1.7vw] px-[4vw] desktop:py-[1vw] py-[2vw] hover:bg-purple200 desktop:hidden block"
            >
              SEND
            </button>
          </div>

        </div>
      )}

    </>
  )
}

export default NewComment