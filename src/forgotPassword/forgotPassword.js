import React from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import {useHistory} from 'react-router-dom';

export default function ForgotPassword(){
  const history = useHistory();

    const sendEmail = e=>{
        e.preventDefault();
        const email={email: e.target['email'].value};
        
        fetch(`${config.API_ENDPOINT}/users/forget-password`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',

            },
            body: JSON.stringify(email)
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => 
                  
                  alert(e.error.message))
              }
                
              return res.json()
            })
            .then(user => {
              history.push(`/users/reset/${user.id}`)
            })
            .catch(error => {
              console.error({ error })
            })

    }
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <form onSubmit={sendEmail} className='forgotPassword'>
                
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' required></input>
                <button type='submit'>Send Reset Password Email</button>
            </form>
        </div>
    )
}