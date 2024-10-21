import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ToDoList from "./components/ToDoList";
import { Helmet } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: "Source Sans 3", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
