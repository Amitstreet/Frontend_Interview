import React from 'react'
import { useState, useRef } from 'react'

function Comment({ Comment_tree, comment }) {

   const[tree,settree]= useState(Comment_tree);
   const [editmode,seteditmode]= useState(false);

  const gettreewithadded=(comment_tree,obj,id)=>{
      if(comment_tree.id==id)
      {
             comment_tree.replay.unshift(obj);
      }
      let update_list=comment_tree.replay.map((ele)=>{
          return gettreewithadded(ele,obj,id);
      })
      return {...comment_tree,replay:update_list}
  }


  const getedittree = (comment_tree,new_comment,id)=>
  {
    if(comment_tree.id==id)
    {
      comment_tree.comment=new_comment;
      return comment_tree
    }

    comment_tree.replay.map((ele)=>{
      return getedittree(ele,new_comment,id);
  })


  return {...comment_tree};
  }

  const inputRef   = useRef();
  const inputRef_2 = useRef();

  const [showinput, setshowinput] = useState(false);
  const handleshowinput = (repl) => {
    setshowinput(true);
    if (showinput) {
      setshowinput(false);
    }
  }


  const handlemode =(e)=>{
    !editmode?seteditmode(true):seteditmode(false);
    
    if(e.target.id)
   {
    console.log(inputRef_2.current.value);
    let new_tree_1 = getedittree(Comment_tree, inputRef_2.current.value,e.target.id);
     let ds={...new_tree_1}
    settree(ds);
    console.log("yes");
    }

  }
  console.log("jjj");

  const addcomment = (e) => {
    setshowinput(true);
    if (showinput) {
      setshowinput(false);
    }
    let comment = inputRef.current.value;
    let obj = {
      id: new Date().valueOf(),
      comment: comment,
      replay: [],
    }

    let new_tree=gettreewithadded(Comment_tree,obj,e.target.id);
    console.log(new_tree);
    settree(new_tree);
  }

  return (
    <div style={{ paddingLeft: 25 }}>
      {Comment_tree.id == "1" && <div class="input">
        <input></input>
        <button>comment it</button>
      </div>}
      <div class="comment">
      {!editmode && <h2  >{Comment_tree.comment}</h2>}         
       { editmode && <div class="edit_input">
          <input ref={inputRef_2} />
          <button id={Comment_tree.id} onClick={handlemode}> save </button>
        </div>}
       { !editmode && <div class="btn_container">
          <button onClick={handleshowinput} >replay</button>
          <button onClick={handlemode}>edit</button>
          <button >delate</button>
        </div>}
      </div>
      {showinput && <div style={{ paddingLeft: 25 }} class="seond_input_contatiner">
        <input ref={inputRef} ></input>
        <button id={Comment_tree.id}  onClick={addcomment}>replay</button>
        <button onClick={handleshowinput} >cancle</button>
      </div>}
      {Comment_tree?.replay?.map((ele) => {
        return (
          <Comment Comment_tree={ele} comment={ele.comment} />
        )
      })}
    </div>
  )
}

export default Comment