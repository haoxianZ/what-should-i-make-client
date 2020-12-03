import React, { useContext,useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import context from '../context';
import config from '../config';
import Display from '../displayIngredients/displayIngredients';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types'; // ES6
import './userPage.css'

export default function UserPage(props){
    const history = useHistory();
   
    let renderContent;
    const Context = useContext(context);
    const {notes=[],users=[]}=Context;
    const  user_id  = props.match.params.userId;
    const user = users.find(user=>user.id === user_id)
    const userNotes = notes.filter(note=>note.user_id === user.serialid)
    renderContent=<Display ingredients = {userNotes}
    user_id={user_id}/>
 
    const handleSubmit=e=> {
        e.preventDefault()
        const newNote = {
          content: e.target['newNote'].value,
          user_id: user.serialid
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newNote),
        })
          .then(res => {
            if (!res.ok) return res.json().then(e => Promise.reject(e))
            console.log(res,'right before resjson')
            return res.json()
          })
          .then(note => {
            console.log(note,'right before adding state')
            Context.addNote(note)
            }).then(history.push(`/users/${user_id}`)
            )
          .catch(error => {
            console.error({ error })
          })
      }
    return (
        <section className='userPage'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            
            <form onSubmit={handleSubmit} className='addToFridge'>
            <label htmlFor='newNote'>Add ingredient to the fridge:  </label>
            <input type='text' id='newNote' name='newNote' required/>
            <button type='submit' className='submitBtn'>Add</button>
            <br/>
            <br/>
            <nav>
                Things in my fridge:

            </nav> 
        </form>
            <div> 
              {renderContent}
                
            </div>
           
        
        </section>
    )
}
UserPage.propTypes={
  match: PropTypes.object.isRequired
}