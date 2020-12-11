import React from 'react';
import{Link} from 'react-router-dom'
import './404Page.css';
export default function NotFound(){
    return(
        <div className='notPage'>
            <Link to='/home-page' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <h3 className='sthWrong'>
                Oooops! Something went wrong.
                <br/>

            </h3>
        </div>
    )
}