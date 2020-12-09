import React from 'react';
import config from './config';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
export default function Reset(props){
    const history = useHistory();
    const  user_id  = props.match.params.userId;
    const resetCode = e=>{
        e.preventDefault();
        const code={code: e.target['resetCode'].value};
        
        fetch(`${config.API_ENDPOINT}/users/reset-password?user_id=${user_id}&code=${code.code}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',

            }
          })
            .then(res => {
              if (!res.ok){
                res.json().then(e=>alert(e.error.message))
                return res.json().then(e => Promise.reject(e))
              }
                
              return res.json()
            })
            .then(user => {
              history.push(`/users/reset/password/${user.id}`)
            })
            .catch(error => {
              
              console.error({ error })
            })

    }
    return(
        <section className='reset'>
            <form onSubmit={resetCode} >
                <label htmlFor='resetCode'>Reset Code:</label>
                <input type='text' id='resetCode' name='resetCode' required></input>
                <button type='submit' className='restBtn'>Submit</button>

             </form>
        </section>
    )
}