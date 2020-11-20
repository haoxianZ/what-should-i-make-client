import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from'./homePage';
import AddUser from './addUser';
import UserPage from './userPage';
import About from './about';
import NotFound from './404Page';
import context from './context';
import config from './config';
function App() {
  const [users, setUsers] = useState([]);
  const [Login,setLogin]=useState(null);
  const [notes,setNotes]=useState([]);
  useEffect(()=>{
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/users`)
    ])
      .then(([notesRes, usersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!usersRes.ok)
          return usersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          usersRes.json(),
        ])
      })
      .then(([notes, users]) => {
        console.log(notes,users)
        setNotes(notes);
        setUsers(users);
      })
      .catch(error => {
        console.error({ error })
      })
  },[])
  
  function handleDeleteNote (noteId) {
    setNotes({
      notes: notes.filter(note => note.id !== noteId)
    })
  }
  const handleAddNote=ingredient=>{
    setNotes({
      notes: [
        notes,
        ingredient
      ]
    })
  }
  const contextValue = {
    users: users,
    notes: notes ,
    Login: Login,
    deleteNote: handleDeleteNote,
    addNote:handleAddNote
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
        path='/users/:userId'
        component={UserPage}
      />
      <Route
        exact path='/about'
        component={About}
      /> 
      <Route 
        path='/'
        component={HomePage}
      />
      <Route component={NotFound} />
      </Switch>
      
    </div>
    </context.Provider>

  );
}

export default App;
