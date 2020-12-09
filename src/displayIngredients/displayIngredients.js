import React, { useContext, useState } from 'react';
import config from '../config';
import context from '../context';
import DisplayRecipe from '../displayRecipe/displayRecipe';
import {useHistory} from 'react-router-dom';
import './displayIngredients.css'


export default function Display(props){
  const history = useHistory();

  const Context = useContext(context);
  console.log(Context)
  function  handleChange (e) {
      const searchWord =e.target.checked ? e.target.value: null;
      const id = e.target.id
      if(searchWord){
        // Context.checkedWords.push(searchWord);
        // console.log(Context.checkedWords)
        const newCheckedWords=[...Context.checkedWords, searchWord];
        Context.setCheckedWords(newCheckedWords);
        localStorage.setItem('checkedWords',JSON.stringify(newCheckedWords) );
        console.log(localStorage)
      }
      else{
        const newCheckedWords=Context.checkedWords.filter(word=>word!==e.target.value);
        Context.setCheckedWords(newCheckedWords);
        localStorage.setItem('checkedWords',JSON.stringify(newCheckedWords) );
      }
    }
    function handleClickDelete (e) {
    e.preventDefault();
    const noteId = e.target.value
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
                checked={console.log(Context.checkedWords)||Context.checkedWords.includes(ingredient.content)}
                value={ingredient.content}
                >
                
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
