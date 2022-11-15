import React, { useState, useContext } from "react";

import "./App.css";
import Orders from "./pages/Orders";
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
    <ModalContext.Provider value={{ addModal: myAdd, setAdd: Add, editModal: myEdit, setEdit: Edit,}}>
      <Orders />
    </ModalContext.Provider>
  );
}

export default App;
