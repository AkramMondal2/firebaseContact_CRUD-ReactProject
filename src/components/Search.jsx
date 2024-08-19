import React from "react";
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
const Search = ({onOpen, filterContact}) => {
  return (
    <div className="flex gap-3">
      <div className=" relative flex flex-grow items-center">
        <FiSearch 
            className=" absolute text-white text-3xl ml-1"
        />
        <input
        onChange={filterContact}
          type="text"
          placeholder="Search Contact"
          className=" flex-grow h-10 bg-transparent border border-white rounded-md placeholder:text-white placeholder:text-base pl-10 text-white "
        />
      </div>
      <div>
        <AiFillPlusCircle onClick={onOpen}
            className=" text-white text-5xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Search;
