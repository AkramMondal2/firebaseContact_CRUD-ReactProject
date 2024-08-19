import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute grid place-items-center top-0 z-40 backdrop-blur h-screen w-screen">
          <div className=" relative z-50 min-h-[200px] min-w-[361px] bg-white mx-auto p-4">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )} 
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
