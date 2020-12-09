import React, { useEffect, useImperativeHandle, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from'./homePage/homePage';
import AddUser from './addUser/addUser';
import UserPage from './userpage/userPage';
import About from './about/about';
import NotFound from './404Page/404Page';
import context from './context';
import config from './config';
import Contact from './contact/contact';
import ForgotPassword from './forgotPassword/forgotPassword';
import Reset from './reset';
import NewPassword from './newPassword';
function App() {
  const [users, setUsers] = useState([]);
  const [Login,setLogin]=useState(null);
  const [notes,setNotes]=useState([]);
  const [recipes,setRecipes]=useState([]);
  const [checkedWords,setCheckedWords]=useState(JSON.parse(localStorage.getItem('checkedWords'))||[]);
  console.log(checkedWords)
  useEffect(()=>{
    async function fetchData(){
      const resNote = await fetch(`${config.API_ENDPOINT}/notes`);
      const resUser = await fetch(`${config.API_ENDPOINT}/users`);
      const jsonNote = await resNote.json();
      const jsonUser = await resUser.json();
      setNotes(jsonNote);
      setUsers(jsonUser);
    }
    fetchData()
    
  },[])
  //   useEffect(()=>{ Promise.all([
  //     fetch(`${config.API_ENDPOINT}/notes`),
  //     fetch(`${config.API_ENDPOINT}/users`)
  //   ])
  //     .then(([notesRes, usersRes]) => {
  //       if (!notesRes.ok)
  //         return notesRes.json().then(e => Promise.reject(e))
  //       if (!usersRes.ok)
  //         return usersRes.json().then(e => Promise.reject(e))

  //       return Promise.all([
  //         notesRes.json(),
  //         usersRes.json(),
  //       ])
  //     })
  //     .then(([notes, users]) => {
  //       console.log(notes,users)
  //       setNotes(notes);
  //       setUsers(users);
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     })
  // },[])
  

  const handleDeleteNote= (noteId) =>{
    noteId = parseInt(noteId);
    const newNotes = notes.filter(note => note.id !== noteId);
    console.log(newNotes, noteId, notes[0].id)
    setNotes(newNotes)
  }
   const handleAddNote=(ingredient)=>{
   
     console.log('before running add note')
    setNotes([
      ...notes,
      ingredient
    ])
    console.log('addnote is ran',notes)
  }
  const showingRecipe = (result)=>{
    setRecipes(result)
    console.log(recipes,'recipe search')

  }
  const handleAddUser = (user) => {
    setUsers({
      users: [
        users,
        user
      ]
    })
  }
  const contextValue = {
    users,
    notes,
    Login,
    recipes,
    checkedWords,
    showRecipe:showingRecipe,
    deleteNote: handleDeleteNote,
    addNote: handleAddNote,
    addUser: handleAddUser,
    setCheckedWords,
    setLogin
  }

  return (
    <context.Provider value={contextValue}>
          <div className="App">
      <Switch>
       
      <Route
        path='/add-user'
        component={AddUser}
      />
      <Route
        exact path='/users/:userId'
        component={UserPage}
      />
      <Route
        exact path='/about'
        component={About}
      />
       <Route
        exact path='/contact'
        component={Contact}
      />
      <Route
        exact path='/forgot-password'
        component={ForgotPassword}
      />
      <Route
        path='/users/reset/:userId'
        component={Reset}
      />
      <Route 
        path='/'
        component={HomePage}
      />
      <Route component={NotFound} />
      </Switch>
      <Route
        path='/users/reset/password/:userId'
        component={NewPassword}
      />
    </div>
    </context.Provider>

  );
}

export default App;
