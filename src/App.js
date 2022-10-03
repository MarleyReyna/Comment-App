import "./App.scss";
import { useState } from "react";
import commentData from "./data";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import DeleteModal from "./DeleteModal/DeleteModal";
import { Context } from "./Context";

function App() {
  const [comments, setComments] = useState([...commentData]);
  const [showDelete, setShowDelete] = useState(false);
  const [indices, setIndices] = useState([]);

  return (
    <div className={showDelete ? "App deleteShown" : "App"}>
      <Context.Provider
        value={{
          comments,
          setComments,
          showDelete,
          setShowDelete,
          indices,
          setIndices,
        }}
      >
        <DeleteModal />
        <Main />
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
