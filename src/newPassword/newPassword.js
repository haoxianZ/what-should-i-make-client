import React from 'react';
import config from '../config';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function NewPassword(props){
    const history = useHistory();
    const  user_id  = props.match.params.userId;
    console.log(user_id)
    const resetPassword = e => {
        e.preventDefault()
        const updateUser = {
            password: e.target['password'].value,
            user_id:user_id
        }
        const confirmPassword = e.target['confirmPassword'].value;
        if(confirmPassword!==updateUser.password){
          alert('Passwords do not match!')
        }
        else{
          fetch(`${config.API_ENDPOINT}/users/reset-password`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(updateUser),
        })
          .then(res => {
            if (!res.ok) return res.json().then(e => Promise.reject(e))
            alert('You have changed your password!');
            return props.history.push(`/`)
          })
          .catch(error => {
            console.error({ error })
          })
        }
        
          
      }
    return(
        <section className='reset'>
            <form onSubmit={resetPassword} >
                <label htmlFor='password'>New Password:</label>
                <input type='password' id='password' name='password' autocomplete="new-password" required></input>
                <br/><br/>
                <label htmlFor='confirmPassword'>Confirm Your Password:</label>
                <input type='password' id='confirmPassword' name='confirmPassword' autocomplete="new-password" required></input>
                <button type='submit' className='restBtn'>Reset</button>

             </form>
        </section>
    )
}