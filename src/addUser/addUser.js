import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import context from '../context'
import config from '../config';
export default function AddUser (props){
    // sign up or login with email and username
    const values = useContext(context);
    const handleAdd = e => {
        e.preventDefault()
        const newUser = {
          username: e.target['username'].value,
         email: e.target['email'].value,
         password: e.target['password'].value
        }
        fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
             values.addUser(user)
            props.history.push(`/`)
            })
          .catch(error => {
            console.error({ error })
          })
          
      }
    return(
      <div>
       
      <Link to='/' style={{ textDecoration: 'none' }}><header>What Should I Make?</header></Link>
      
      <form onSubmit={handleAdd} className='login'>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' name='username' required></input>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email' required></input>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' required></input>
      <button type='submit'>Sign up</button>
      <Link to='/' style={{ textDecoration: 'none' }}>
      <button>Cancel</button></Link>

      </form>
      </div>
     
    )
}