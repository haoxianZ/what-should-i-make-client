import React from 'react';
import {Link} from 'react-router-dom'
import emailjs from 'emailjs-com';
import {useHistory} from 'react-router-dom';

import './contact.css'
export default function Contact(){
    const history=useHistory();
    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_8mq29g9', 'template_u2qcn7p', e.target, 'user_Qof97B4UQhYhPaiNqMWOx')
          .then((result) => {
              alert('Thank you for contacting us');
              history.push('/home-page');

          }, (error) => {
          });
      }
    return(
        <div>
            <Link to='/home-page' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
            </Link>
            <form className='contactForm' onSubmit={sendEmail}>
            <h3><label htmlFor='subject' >Subject: </label></h3>
            <input name='subject'/>
            <br/>
            <h3><label htmlFor='message' >Message: </label></h3>
            <textarea name='message' rows="10" cols="70" required>

            </textarea>
            
            <h3><label htmlFor='from_name' >Your Email:</label></h3>
            <input type='email' name='from_name'/>
            <br/>
            <button type="submit">Send</button>
        </form>
        </div>
        
    )
}