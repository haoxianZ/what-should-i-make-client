import React from 'react';
import {Link} from 'react-router-dom';
export default function About(){
    return(
        <div>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <h2>
            Welcome! 
            </h2>
            <h3>
                How do I use this App?
            </h3>
            <h4>
                Create an account and log in what you have in the Fridge. 
            Then explore what you can cook with them!
            </h4>
            
        </div>
    )
}