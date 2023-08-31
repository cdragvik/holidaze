const Modal = ({ show, onClose, children }) => {
    const modalStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: 'white',
      zIndex: 1,
    };
    
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 0,
    };
  
    if (!show) {
      return null;
    }
  
    return (
      <>
        <div style={backdropStyle} onClick={onClose}></div>
        <div style={modalStyle}>
          {children}
        </div>
      </>
    );
  };
  
  export default Modal;
  