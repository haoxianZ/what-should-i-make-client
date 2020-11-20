import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import context from './context';
import config from './config';
import {useHistory} from 'react-router-dom';
export default function HomePage(){
  const history = useHistory()
    const Context = useContext(context)
    function handleSubmit(e){
      e.preventDefault()
        const user = {
          username: e.target['username'].value,
          email: e.target['email'].value
        }
        fetch(`${config.API_ENDPOINT}/users?username=${user.username}&email=${user.email}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
            history.push(`/users/${user.id}`)
          })
          .catch(error => {
            console.error({ error })
          })
    }
    return(
        <div className='landingPage'>
            <header>What should I Make?</header>
            <Link to='/about' >About</Link>
            <main>
              
                <form onSubmit={handleSubmit}>
                <div className='userbox'>
                      <input placeholder='Username' type='test' id='username' name='username' required>
                      </input>
                      <input placeholder='Email' type='email' id='email' name='email' required></input>
                    </div>
                    <div className='buttons'>
                      <button type='submit'>
                        Log in
                      </button>
                      <Link to='/add-user' style={{ textDecoration: 'none' }}>
                        <button>
                            Sign up
                        </button>
                      </Link>
                    </div>
                </form>
            </main>
        </div>
    )
}