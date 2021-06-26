import React from 'react'
import './history.scss'
let ls = require('local-storage');


const History = () => {

    let history = ls.get('History');

    return (
        <ul id="history">

            {
                    
                             history?  history.map((ele,idx) =>{
                               return(<li key={idx}> <span className="method">{ele.method}</span>  <button id="button-url" className="url">{ele.url}</button></li>)
                               }):null

        
            }

        </ul> 
    );
};

export default History;