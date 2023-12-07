import React from "react";

interface ModalProps{
    modalOpen: boolean;
    setmodalOpen: (open: boolean) => boolean | void;
    children : React.ReactNode
}
const Modal:React.FC<ModalProps> = ({modalOpen ,setmodalOpen ,children}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
         <h3 className="font-bold text-lg">TO DO List!</h3> 
         <div className="my-2">
         {children}
         </div>
        <div className="modal-action">
          <label onClick={() => setmodalOpen(false)} htmlFor="my_modal_6" className="btn">
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
