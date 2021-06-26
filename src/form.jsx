import React from 'react';
import './form.scss'
const axios = require('axios');
let ls = require('local-storage');

let fetchMethod = 'GET';
let urlValue = 'https://swapi.dev/api/people';
let lsArray = [];


function getHistory() {
    let checked = ls.get('History');
    if (checked) {
        lsArray = checked;
    }
}
getHistory();

function saveHistory() {
    let check = ls.get('History');
    if (check) {
        ls.set('History', lsArray);
        return;
    }
    else {
        let lsValue = lsArray.pop();
        lsArray.length = 0;
        lsArray.push(lsValue);
        ls.set('History', lsArray);
        return;
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "",
            url: ""
        }
    }
    urlFetcher = e => {
        urlValue = e.target.value;
    }
    methodFetcher = e => {
        e.preventDefault()
        fetchMethod = e.target.value;
        return fetchMethod;
    }
    buttonHandler = async e => {
        e.preventDefault();

        let lsResult = { method: fetchMethod, url: urlValue };
        lsArray.push(lsResult);
        saveHistory();

        if (fetchMethod === 'GET') {

            let allocatedData = await fetch(urlValue);
            let data = await allocatedData.json();

            const results = {
                Headers: { 'Content-Type': 'application/json' },
                Response: data
            };

            this.props.handler(results);
        }
        else {
            let bodyText = document.getElementById('inputBody');
            let body = bodyText.value;
            let results = await axios({
              method: `${fetchMethod}`,
              url: `${urlValue}`,
              data: JSON.parse(body),
            });
            this.props.handler(results.data, 0, this.state.flag);
          }

    }
    render() {
        return (
            <main>
                <form id="form">

                    <label>URL :
                        <input type="url" placeholder="Input URL here" onChange={this.urlFetcher} required aria-required="true" pattern="^(https?://)?([a-zA-Z0-9]([a-zA-ZäöüÄÖÜ0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$" />
                        <button onClick={this.buttonHandler} id="go-btn">Go</button>

                        <br />

                        <label>Body :
                            <textarea type="text" name="body" id="inputBody" placeholder="Input Body here"></textarea>
                        </label>
                        <br />
                        <label>Method :
                            <button value="GET" onClick={this.methodFetcher} id="click-btn" className="method-button"> Get</button>
                            <button value="POST" onClick={this.methodFetcher} id="click-btn" className="method-button"> Post</button>
                            <button value="PUT" onClick={this.methodFetcher} id="click-btn" className="method-button"> Put</button>
                            <button value="DELETE" onClick={this.methodFetcher} id="click-btn" className="method-button"> Delete</button>
                        </label>
                    </label>

                </form>
            </main>
        );
    }
};
export default Form;