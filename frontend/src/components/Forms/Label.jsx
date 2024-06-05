/*
  Label Component
  
  This component represents a styled form label.
  
  Props:
  - All props accepted by the standard HTML label element.
*/

import React from "react";
import { StyledLabel } from "./FormStyles";

const Label = ({ ...props }) => {
  return (
    <StyledLabel {...props} />
  );
};

export default Label;
