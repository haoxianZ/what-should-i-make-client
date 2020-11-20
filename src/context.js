import React from 'react'

const context= React.createContext({
  users: [],
  Login:null,
  addUser: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
export const contextProvider = context.Provider;
export default context;