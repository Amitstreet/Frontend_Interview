import { useState } from "react";
import Comment from './components/Comment'
import './styles.css'

const App = () => {

  const Comment_tree = {
    id: "1",
    comment: "Amit",
    replay: [],
  }


  return (
    <div className="App">
      <Comment   Comment_tree={Comment_tree} comment={Comment_tree.comment} />
    </div>
  );
};

export default App;
