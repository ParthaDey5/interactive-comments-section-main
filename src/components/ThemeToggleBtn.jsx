import React, { useState } from "react";

function ThemeToggleBtn({dark, setDark}) {
  

  const toggleBtn = () => {
    if (!dark) {
      setDark(true);
    } else {
      setDark(false);
    }
  };
  return (
    <>
      <div
        className={`${
          dark ? "-translate-x-0 bg-[url('/icons/dark.png')]" : "desktop:-translate-x-[3.1vw] -translate-x-[7.3vw] bg-[url('/icons/light.png')]"} desktop:bg-[length:55%_65%] bg-[length:55%_70%] bg-grey50 desktop:w-[2.6vw] w-[7vw] desktop:h-[2.6vw] h-[7vw] rounded-full pointer border border-grey100  bg-no-repeat  bg-center z-10 transform-all duration-400 ease-linear  !shadow-[inset_0_0_0.2vw_0.2vw_rgba(255,179,183,0.1)]`}
        onClick={toggleBtn}
      ></div>
      <div className={`desktop:w-[5.5vw] w-[14vw] desktop:h-[2.4vw] h-[6.6vw] rounded-full absolute ${!dark?"bg-gray-200":"bg-grey500 border-grey300 desktop:border-2 border-1"} `}>
        <p
          className={`${
            !dark ? "opacity-0" : "opacity-100"
          } extraSmalltext no-scrollbar text-grey50 desktop:leading-[0.66vw] leading-[1.7vw] absolute left-1/4 top-1/2 -translate-y-1/2 desktop:-translate-x-1/3 -translate-x-[2.2vw] transition-opacity duration-400 ease-linear`}
        >
          DARK
          <br /> MODE
        </p>
        <p
          className={`transition-opacity duration-400 ease-linear ${
            !dark ? "opacity-100" : "opacity-0"
          } extraSmalltext no-scrollbar desktop:leading-[0.66vw] leading-[1.7vw] absolute right-1/5 top-1/2 -translate-y-1/2 translate-x-1/4`}
        >
          LIGHT
          <br /> MODE
        </p>
      </div>
    </>
  );
}

export default ThemeToggleBtn;
