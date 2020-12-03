import React, { useContext } from 'react';
import config from '../config';
import context from '../context';
import DisplayRecipe from '../displayRecipe/displayRecipe';
import {useHistory} from 'react-router-dom';
import './displayIngredients.css'


export default function Display(props){
  const history = useHistory();
  const Context = useContext(context);
  function  handleChange (e) {
      const searchWord =e.target.checked ? e.target.value: null;
      const id = e.target.id
      console.log(searchWord)
      if(searchWord){
        Context.checkedWords.push(searchWord);
        localStorage.setItem(id,searchWord)
        console.log(localStorage);
      }
      else{
        console.log(e.target.value)
        let num =Context.checkedWords.indexOf(e.target);
        if(num) Context.checkedWords.splice(num, 1);
        localStorage.removeItem(id);
        console.log(localStorage);
      }
    }
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
        history.push(`/users/${props.user_id}`)
      })
      .catch(error => {
        console.error({ error })
      })
      
  }
 
const displayEachItem=props.ingredients.map((ingredient,i)=>
        <section key={i}>

            <label className='ingredient' htmlFor={i}>{ingredient.content}</label>
            <input id={i} 
                name='ingreditents' 
                onChange={handleChange}
                type='checkbox' 
                value={ingredient.content}>
            </input>
            <button
          className='Note_delete'
          type='button'
          onClick={handleClickDelete}
          value={ingredient.id}
        >
          Remove
        </button>
        <br/>
        </section>
        )
        
    return(
      <div>
        {displayEachItem}
        <DisplayRecipe />
      </div>
        
        
    )
}
