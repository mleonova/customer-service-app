/*
  Input Component
  
  This component represents a styled form input field.
  
  Props:
  - All props accepted by the standard HTML input element.
*/

import React from "react";
import { StyledInput } from "./FormStyles";

const Input = ({ ...props }) => {
  return (
    <StyledInput {...props} />
  );
}

export default Input;
