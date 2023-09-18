import { styled } from "styled-components";


export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #213555;
`;

export const TextArea = styled.textarea`
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 80%;
  margin: 60px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Helvetica', 'Arial', sans-serif;
`;

export const StyledInput = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.6;
  transition: border-color 0.2s ease-in-out;
`;

export const RegistrationSuccess = styled.p`
  padding-top: 20px;
`

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const Card = styled.form`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 30px;
  border-radius: 16px;
  width: 80%;  // Make it fill up the ModalContainer

`;

export const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;  // changed to flex-start
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: white; // Make background white
  z-index: 1001;
  width: 60%;  // Set the default width to 80% of the viewport
  max-width: 800px;  // Set a maximum width limit
  max-height: 80vh;  // Set maximum height
  overflow-y: auto;  // Allow vertical scrolling
  /* ... */
`;


