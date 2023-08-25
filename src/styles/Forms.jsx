import { styled } from "styled-components";

export const Card = styled.div`
  background-color: #F5EFE7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);

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

export const SubmitButton = styled.button`
  background-color: #4F709C;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #213555;
  }
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