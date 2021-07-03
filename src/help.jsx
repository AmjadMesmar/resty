import React from 'react';
import './help.scss';
import { BrowserRouter as Router } from 'react-router-dom';



const Help = () => {
    return (
        <Router>

        <div>
        <h2>Help Page</h2>
        <p id="help"> This web app allows the user to use  Restful methods by entering the API url and choosign the method needed, it also allows the user to use body input for POST,PUT and DELETE methods. Besides, the web app include a history feature. </p>
    
        </div>
        </Router>
       );
};

export default Help;
