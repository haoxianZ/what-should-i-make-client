import React, { useEffect, useState } from 'react';
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
import Reset from './reset/reset';
import NewPassword from './newPassword/newPassword';
import LandingPage from './landingPage/landingPage';
function App() {
  const [users, setUsers] = useState([]);
  const [Login,setLogin]=useState(null);
  const [notes,setNotes]=useState([]);
  const [recipes,setRecipes]=useState([]);
  const [checkedWords,setCheckedWords]=useState(JSON.parse(localStorage.getItem('checkedWords'))||[]);
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
  
  const handleDeleteNote= (noteId) =>{
    noteId = parseInt(noteId);
    const newNotes = notes.filter(note => note.id !== noteId);
    setNotes(newNotes)
  }
   const handleAddNote=(ingredient)=>{
   
    setNotes([
      ...notes,
      ingredient
    ])
  }
  const showingRecipe = (result)=>{
    setRecipes(result)

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
        exact path='/home-page'
        component={HomePage}
      />
      <Route 
        exact path='/'
        component={LandingPage}
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
