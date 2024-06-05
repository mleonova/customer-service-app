/*
  Form Component
  
  This component represents a styled form container.
  
  Props:
  - All props accepted by the standard HTML form element.
*/

import React from "react";
import { StyledForm } from "./FormStyles";

const Form = ({ children, ...props }) => {
  return (
    <StyledForm {...props}>
      {children}
    </StyledForm >
  );
}

export default Form;