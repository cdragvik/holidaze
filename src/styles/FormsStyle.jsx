import { styled } from "styled-components";

export const Card = styled.div`
  background-color: #F5EFE7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 1000px;
  max-height: 80vh; // Set the maximum height
  overflow-y: auto; // Enable vertical scrolling

`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #213555;
`;

export const Input = styled.input`
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  max-width: 300px;
  margin: 30px auto;
  background-color: #f5efe7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

export const ModalContainer = styled.div`
  margin: 100px auto;
  padding: 20px;
  background: white;
  width: 300px;
`;
