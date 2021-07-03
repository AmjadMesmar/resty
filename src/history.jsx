import React from 'react'
import './history.scss'
let {lsArray,getHistory,newEntry} = require('./form');
let ls = require('local-storage'); 
// let lsArray = [];

// function getHistory() {
//     let checked = ls.get('History');
//     if (checked) {
//         lsArray = checked;
//     }
// }

 function getHistoryInput (e) {

let data = e.target.parentNode.getAttribute('id');
console.log("🚀 ~ file: history.jsx ~ line 8 ~ getHistoryInput ~ data", data)
getHistory();
console.log("🚀 ~ file: history.jsx ~ line 26 ~ getHistoryInput ~ lsArray", lsArray)

    let historyObject = Object.entries(lsArray)[data][1];
    console.log("🚀 ~ file: history.jsx ~ line 24 ~ getHistoryInput ~ historyObject", historyObject)

    let input = document.getElementById('formUrlInput');
    let method = document.getElementById(historyObject.method);
    let body = document.getElementById('inputBody');

    input.value = historyObject.url;
    body.innerHTML = '';
    body.innerHTML = historyObject.body;
    method.click();
    method.focus();
    newEntry = false;
    console.log("🚀 ~ file: history.jsx ~ line 34 ~ getHistoryInput ~ newEntry", newEntry)

}

const History = () => {

    let history = ls.get('History');

    return (
        <ul id="history">

            {
                    
                             history?  history.map((ele,idx) =>{
                               return(<li onClick={getHistoryInput} id ={idx} key={idx}> <span id="historyMethod" className="method">{ele.method}</span>  <span  id="buttonUrl" className="url">{ele.url}</span></li>)
                               }):null

        
            }

        </ul> 
    );
};

export default History;