import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid ${(props) => (props.$error ? "#F84D4D" : "#94A6BE")};
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
  font-size: 14px;
  line-height: 1;
  transition: border-color 0.3s ease;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
  }

  &:focus {
    border-color: ${(props) => (props.$error ? "#F84D4D" : "#4a6cf7")};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => (props.$error ? "#F84D4D" : "#94A6BE")};
  border-radius: 8px;
  padding: 12px 8px;
  outline: none;
  font-size: 14px;
  line-height: 1;
  resize: vertical;
  min-height: 100px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: #94a6be;
  }

  &:focus {
    border-color: ${(props) => (props.$error ? "#F84D4D" : "#4a6cf7")};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const BaseInput = ({
  tag = "input",
  id,
  name,
  placeholder = "",
  type = "text",
  error = false,
  onChange,
  value,
  required = false,
  disabled = false,
}) => {
  const Component = tag === "textarea" ? StyledTextarea : StyledInput;

  return (
    <Component
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      $error={error}
      onChange={onChange}
      value={value}
      required={required}
      disabled={disabled}
      style={{
        opacity: disabled ? 0.7 : 1,
      }}
    />
  );
};

export default BaseInput;
