import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 8px;
  padding: 0 12px;
  outline: none;
  font-size: 14px;
  line-height: 1;
  transition: border-color 0.3s ease;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$error ? "rgba(255, 82, 82, 0.2)" : "rgba(106, 115, 255, 0.2)"};
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#3A3D42" : "#f5f5f5"};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 8px;
  padding: 12px 8px;
  outline: none;
  font-size: 14px;
  line-height: 1;
  resize: vertical;
  min-height: 100px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    color: ${(props) => props.theme.colors.textSecondary};
  }

  &:focus {
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$error ? "rgba(255, 82, 82, 0.2)" : "rgba(106, 115, 255, 0.2)"};
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#3A3D42" : "#f5f5f5"};
    cursor: not-allowed;
    opacity: 0.7;
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
