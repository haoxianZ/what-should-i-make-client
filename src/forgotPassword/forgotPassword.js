import React from 'react';
import {Link} from 'react-router-dom';
export default function ForgotPassword(){
    const sendEmail = e=>{
        e.preventDefault();

    }
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <form onSubmit={sendEmail} className='forgotPassword'>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' required></input>
                <label htmlFor='email'>Email:</label>
                <input type='password' id='email' name='email' required></input>
                <button type='submit'>Send Reset Password Email</button>
            </form>
        </div>
    )
}