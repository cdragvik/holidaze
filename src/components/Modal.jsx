import { ModalBackground, ModalContainer } from "../styles/FormsStyle";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <ModalBackground onClick={onClose}></ModalBackground>
      <ModalContainer>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;