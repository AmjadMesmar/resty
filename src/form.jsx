import React from 'react';
import './form.scss'
import Loader from './loader'
// const Regex = require('regex');
const axios = require('axios');
let ls = require('local-storage');

let fetchMethod;
let urlValue;
export let { newEntry } = true;
// let urlRegex = new Regex();
export let { lsArray } = [];


export function getHistory() {
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
            url: "",
            loading: false
        }
    }

    urlFetcher = e => {
        e.preventDefault();
        urlValue = e.target.value;
        console.log("🚀 ~ file: form.jsx ~ line 47 ~ Form ~ urlValue", urlValue)
    }
    methodFetcher = e => {
        e.preventDefault()
        fetchMethod = e.target.value;
        return fetchMethod;
    }
    buttonHandler = async e => {
        e.preventDefault();
        let getUrl = document.getElementById('formUrlInput').value;
        let bodyText = document.getElementById('inputBody');
        let body = bodyText.value;

        let lsResult = { method: fetchMethod, url: getUrl, body: body };
        console.log("🚀 ~ file: form.jsx ~ line 59 ~ Form ~ body", body)

        if(getUrl === ''){
            // throw new Error ('Cant accept empty url!');
            alert("Cant accept empty url!")
            return;
        }

        // if(!urlRegex.test(getUrl)){
        //     console.log("🚀 ~ file: form.jsx ~ line 64 ~ Form ~ urlRegex.test(getUrl)", urlRegex.test(getUrl))
        //     alert("Cant accept invalid url input!")
        //     return;
        // }

        if (newEntry) {
            lsArray.push(lsResult);
            console.log("🚀 ~ file: form.jsx ~ line 55 ~ Form ~ fetchMethod", fetchMethod)
            saveHistory();
        }
        this.setState({ loading: true });
        if (fetchMethod === 'GET') {

            let allocatedData = await fetch(getUrl);
            let data = await allocatedData.json();


            const results = {
                Headers: { 'Content-Type': 'application/json' },
                Response: data
            };

            this.state.loadedData = results;
            setTimeout(() => {
                this.props.handler(results);
                this.setState({ loading: false })
            }, 2000)
            
        }
        else {
            let bodyText = document.getElementById('inputBody');
            let body = bodyText.value;
            let results = await axios({
                method: `${fetchMethod}`,
                url: `${getUrl}`,
                data: JSON.parse(body),
            });
            newEntry = true;
            this.state.loadedData = results;
            setTimeout(() => {
                this.props.handler(results.data, 0, this.state.flag);
                this.setState({ loading: false })

            }, 2000)

        }



    }

    render() {
        const mystyle = {
            position: "relative",
            left: 400,
            top: 50
          };
            
        return (
            <main>
                <form id="form">
                <span id="loadingSpinner"
                         style={mystyle}> {this.state.loading ? <Loader /> : false}</span> 

                    <label id="urlLable">URL :
                        <input type="url" id="formUrlInput" placeholder="Input URL here" onChange={this.urlFetcher} required />
                        <button disabled={this.state.loading} onClick={this.buttonHandler} id="goButton>">Go
                        </button>

                        <br />

                        <label>Body :
                            <textarea type="text" name="body" id="inputBody" placeholder="Input Body here"></textarea>
                        </label>
                        <br />
                        <label>Method :
                            <button value="GET" onClick={this.methodFetcher} id="GET" className="method-button"> Get</button>
                            <button value="POST" onClick={this.methodFetcher} id="POST" className="method-button"> Post</button>
                            <button value="PUT" onClick={this.methodFetcher} id="PUT" className="method-button"> Put</button>
                            <button value="DELETE" onClick={this.methodFetcher} id="DELETE" className="method-button"> Delete</button>
                        </label>
                    </label>

                </form>
            </main>

        );
    }

};

export default Form;