import React, { useState, useContext } from "react";

import "./App.css";
import Employees from "./pages/Employees";
import ModalContext from "./context/modalContext";

function App() {
  const [myAdd, setMyAdd] = useState(false);
  const [myEdit, setMyEdit] = useState(false);
  const Add = () => {
    setMyAdd(!myAdd);
  };

  const Edit = () => {
    setMyEdit(!myEdit);
  };
  return (
    <ModalContext.Provider
      value={{ addModal: myAdd, setAdd: Add, editModal: myEdit, setEdit: Edit }}
    >
      <Employees />
    </ModalContext.Provider>
  );
}

export default App;
