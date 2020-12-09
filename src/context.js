import React from 'react'

const context= React.createContext({
  users: [],
  notes:[],
  Login:null,
  checkedWords:[],
  recipes:[],
  addUser: () => {},
  addNote: ()=>{},
  deleteNote: ()=>{},
  showRecipe:()=>{},
  setLogin:()=>{}
})
export const contextProvider = context.Provider;
export default context;