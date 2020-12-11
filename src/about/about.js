import React from 'react';
import {Link} from 'react-router-dom';
import './about.css'
export default function About(){
    return(
        <div >
            <Link to='/home-page' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <div className='about'>
               <h2>
            Welcome! 
            </h2>
            <h3>
                What is this?
            </h3>
            <h4>
                This is an app to help you to decide what to cook base on what is in your fridge. 
            </h4>
            <h3>
                How do I use this App?
            </h3>
            <h4>
                Create an account and log in what you have in the Fridge. 
            Then explore what you can cook with them!
            </h4> 
            </div>
            
            
        </div>
    )
}