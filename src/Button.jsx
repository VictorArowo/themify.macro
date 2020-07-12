import React from "react";
import t from "./themify.macro";

const Blue = t.div`
    color: blue
`;
const Button = () => {
  return <Blue>Another component</Blue>;
};

export default Button;
