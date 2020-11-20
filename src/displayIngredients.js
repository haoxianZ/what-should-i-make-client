import React, { useContext } from 'react';
import config from './config';
import context from './context';
let ingredients;
function  handleChange (e) {
    const searchWord =e.target.checked ? e.target.value: null;
    console.log(searchWord)
    ingredients=searchWord;
  }

export default function Display(props){
    const Context = useContext(context);
    function handleClickDelete (e) {
    e.preventDefault();
    const noteId = e.target.value
    console.log(e.target.value,noteId)
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        Context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        props.onDeleteNote()
      })
      .catch(error => {
        console.error({ error })
      })
      
  }
    return(
        props.ingredients.map((ingreditent,i)=>
        <div key={i}>
            <label htmlFor={i}>{ingreditent.content}</label>
            <input id={i} 
                name='ingreditents' 
                onChange={handleChange}
                type='checkbox' value={ingreditent.content}>
            </input>
            <button
          className='Note__delete'
          type='button'
          onClick={handleClickDelete}
          value={ingreditent.id}
        >
          Remove
        </button>
        </div>
        )
    )
}