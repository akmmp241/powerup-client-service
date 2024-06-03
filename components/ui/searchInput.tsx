import * as React from "react"
import searchIcon from "@/app/assets/search-icon.svg"
import Image from "next/image";
import {useState} from "react";

const SearchInput = () => {
  const [showData, setShowData] = useState<string>("w-0 pl-0 border-none drop-shadow-none")

  const searchToggleHandler = () => {
    setShowData("w-full shadow-sm border-[1px] pl-6 border-primary")
  }

  const onFocusHandler = () => {
    setShowData("w-0 pl-0 border-none drop-shadow-none")
  };

  return (
      <div className={`relative top-[-20px] flex justify-end w-72`}>
        <input
            id={"searchbar"}
            type={"text"}
            placeholder={"Search..."}
            onBlur={onFocusHandler}
            className={`${showData} flex text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 absolute h-12 max-h-12 text-body-text outline-none bg-secondary rounded-[200px]`}/>
        <span id={"search-toggle-icon"} onClick={searchToggleHandler}>
          <Image id={"search-icon"} src={searchIcon} alt={"search"} width={24} height={24}/>
        </span>
      </div>
  );
}

export default SearchInput
