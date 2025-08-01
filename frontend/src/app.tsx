import React from "preact/compat";
import ContextsWrapper from "./components/ContextsWrapper";
import Home from "./pages/Home/home";

export default function App() {
  return (
    <>
      <ContextsWrapper>
        <Home />
      </ContextsWrapper>
    </>
  );
}
