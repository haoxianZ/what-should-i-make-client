import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import context from './context';
import config from './config';
import Display from './displayIngredients';
import {useHistory} from 'react-router-dom';
const recipeSearchAPIid='2a499952';
const recipeSearchAPIkey='c5e68ccb26db262d07a7a350a3573cc0';
const recipeSearchURL='https://api.edamam.com/search';
let Result;
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};
function getRecipe(keyword, maxResults=10){
    const params = {
        q: keyword,
        app_id: `${recipeSearchAPIid}`,
        app_key:`${recipeSearchAPIkey}`,
        to: maxResults
      };
      const queryString = formatQueryParams(params)
      const url = recipeSearchURL + '?' + queryString;
      fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => Result=responseJson)
    .catch(error => {
        console.error({ error })
      });
};
let ingreditents ='';

// function handleSubmit(e){
//     e.preventDefault();
//     console.log(ingreditents)
//     //getRecipe(ingreditents)
// }
export default function UserPage(props){
    const history = useHistory();
    function handleDeleteNote () {
        history.push(`/users/${props.match.params.user_id}`)
      }
    let renderContent;
    const Context = useContext(context);
    const {notes=[],users=[]}=Context;
    const  user_id  = props.match.params.userId;
    console.log(props)
    const user = users.find(user=>user.id === user_id)
    console.log(user)
    const userNotes = notes.filter(note=>note.user_id === user.serialid)
    console.log(userNotes)
    renderContent=<Display ingredients = {userNotes}
    onDeleteNote={handleDeleteNote}/>
    handleSubmit= e=> {
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
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(note => {
            Context.addNote(note)
            history.push(`/users/${user_id}`)
            })
          .catch(error => {
            console.error({ error })
          })
      }
    return (
        <section className='userPage'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h2>What Should I Make?</h2>
            </Link>
            <nav>
                Things in my fridge:
                <br/>
            </nav>
            <div>
                <form >
                    {renderContent}
                    <button type='submit' className='submitBtn'>Search</button>
                </form>
                {Result}
            </div>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor='newNote'>Add ingredient to the fridge:  </label>
            <textarea type='textarea' id='newNote' name='newNote' required></textarea>
            
            <button type='submit' className='submitBtn'>Add</button>
        </form>
        </section>
    )
}