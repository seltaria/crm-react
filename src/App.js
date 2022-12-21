import React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

export function App() {
  const [inputData, setInputData] = React.useState('');

  return (
    <div className="app">
      <Header
        inputData={inputData}
        setInputData={setInputData}
      />
      <Main
        inputData={inputData}
        setInputData={setInputData}
      />
    </div>
  )
}