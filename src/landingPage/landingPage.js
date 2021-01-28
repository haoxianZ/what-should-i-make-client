import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';
export default function LandingPage(){
    return(
        <div className='landingPage'>
            <div className='video'>
                {/* <div style={{backgroundColor:'red', width:'100%', height:'100%'}}></div> */}
                <video id="background_video" className='background_video' autoPlay loop muted >
                <source src='video.mp4'type='video/mp4' />
            </video>
            </div>
            
           <Link to='/home-page' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <nav>
              <Link style={{ textDecoration: 'none' }} to='/about' >About</Link>
              <Link style={{ textDecoration: 'none' }} to='/contact' >Contact</Link>
            </nav>
            <main className='intro'>

              <h1>
              Welcome! 
              </h1>
              <h3>
                  What is this?
              </h3>
              <h4>
                  This is an app to help you to decide what to cook base on what is in your fridge. 
              </h4>
              <br/><br/><br/>
              <h3>
                  How do I use this App?
              </h3>
              <h4>
                  Create an account and log in what you have in the Fridge. 
              Then explore what you can cook with them!
              </h4>
            <Link to='/home-page' style={{ textDecoration: 'none' }}>
                <button className='start'>Let's get started</button>
            </Link>
           
            </main>
        </div>
    )
}