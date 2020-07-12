import React from "react";
import Blue from "./Button";
import t from "./themify.macro";

const Button = t.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = t(Button)`
  color: black;
  border-color: tomato;
  background: grays(50);
`;

const Div = t.div`
  background: ({ theme }) => theme.grays[50];
`;

const Check = t.div`
  background: ({ theme }) => theme.grays[0];
`;

function App() {
  return (
    <div className="App">
      <Div>Hi</Div>
      <Check>dot Syntax</Check>
      <TomatoButton>bracket Syntax</TomatoButton>
      <Blue />
    </div>
  );
}

export default App;
