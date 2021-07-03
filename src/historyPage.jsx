/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react';
import './historyPage.scss'
import JSONPretty from 'react-json-pretty';
import Loader from './loader';
import 'react-json-pretty/themes/monikai.css';
let axios = require('axios');
let { lsArray, getHistory } = require('./form');
let JSONPrettyMon = require('react-json-pretty/dist/monikai');

let ls = require('local-storage');

const HistoryPage = () => {

  let [historyResult, setHistoryResult] = useState();
  let [loading, setLoading] = useState();

  async function getHistoryInput(e) {

    let data = e.target.parentNode.getAttribute('id');
    getHistory();

    let historyObject = Object.entries(lsArray)[data][1];
    console.log("🚀 ~ file: historyPage.jsx ~ line 20 ~ getHistoryInput ~ historyObject", historyObject)

    let url = historyObject.url;
    let method = historyObject.method;
    let body = historyObject.body;

    let oldResults = document.getElementById('historyResult');
    oldResults.style.color = "blue";
    oldResults.style.fontWeight = "bold";
    oldResults.style.textAlign = "center";
    oldResults.innerHTML = '🧐PLEASE WAIT, WE ARE PROCESSING YOUR REQUEST 🧐';
    setLoading(true);
    if (method === 'GET') {

      let allocatedData = await fetch(url);
      let data = await allocatedData.json();

      const results = {
        Headers: { 'Content-Type': 'application/json' },
        Response: data
      };

      setTimeout(() => {
        oldResults.style.textAlign = "left";
        oldResults.style.fontWeight = "200";
        setHistoryResult(results);
        setLoading(false);
      }, 2000)

      console.log("🚀 ~ file: historyPage.jsx ~ line 36 ~ getHistoryInput ~ historyResult", historyResult)
    }
    else {
      let results = await axios({
        method: `${method}`,
        url: `${url}`,
        data: JSON.parse(body),
      });

      setTimeout(() => {
        oldResults.style.textAlign = "left";
        oldResults.style.fontWeight = "200";
        setHistoryResult(results);
        setLoading(false);
      }, 2000)
      console.log("🚀 ~ file: historyPage.jsx ~ line 36 ~ getHistoryInput ~ historyResult", historyResult)
    }
  }
  useEffect(() => {
    console.log('check')
    if (historyResult) {
      console.log(historyResult)
    }
  }, [historyResult])

  let history = ls.get('History');

  return (
    <React.Fragment>
      <div>
        <ul id="history">

          {

            history ? history.map((ele, idx) => {
              return (<li onClick={getHistoryInput} id={idx} key={idx}> <span id="historyMethod" className="method">{ele.method}</span>  <span id="buttonUrl" className="url">{ele.url}</span></li>)
            }) : null



          }

        </ul>
      </div>
      <div>
      <span id="loadingSpinner"> {loading? <Loader /> : false}</span> 

        {
          <JSONPretty id="historyResult" data={historyResult} theme={JSONPrettyMon}></JSONPretty>

        }
      </div>
    </React.Fragment>
  );

};


export default HistoryPage;