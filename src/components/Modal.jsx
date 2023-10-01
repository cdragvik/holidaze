// Importing necessary styling components from your styling file
import { ModalBackground, ModalContainer } from "../styles/FormsStyle";

// Defining the Modal component which takes in three props: show, onClose, and children
const Modal = ({ show, onClose, children }) => {
  // If the show prop is false, return null (don't render anything)
  if (!show) {
    return null;
  }

  return (
    // Rendering a fragment to hold your modal elements
    <>
      {/* 
         Modal background which will cover the whole screen, 
         and has an onClick handler to call onClose function 
      */}
      <ModalBackground onClick={onClose}></ModalBackground>
      
      {/* 
         Modal container to hold the actual content of the modal. 
         This container will render whatever is passed as children to this component.
      */}
      <ModalContainer>
        {children}
      </ModalContainer>
    </>
  );
};

// Exporting the Modal component so it can be used elsewhere in your project
export default Modal;
