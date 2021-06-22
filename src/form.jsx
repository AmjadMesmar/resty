import React from 'react';
import './form.scss'
let fetchMethod='';
let urlValue='';

class Form extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            method:"",
            url:""
        }
    }
    urlFetcher = e =>{
        urlValue = e.target.value;
    }
    methodFetcher = e => {
        e.preventDefault()
      fetchMethod =e.target.value;
        return fetchMethod;
    }
    buttonHandler = async e =>{
        e.preventDefault();
        if(fetchMethod === 'GET'){
        let allocatedData = await fetch(urlValue);
        let data = await allocatedData.json();
        console.log('.............. ', data);
        const results = {
        Headers: { 'Content-Type': 'application/json' },
        Response:data};
        console.log("🚀 ~ file: form.jsx ~ line 30 ~ Form ~ results", results)

        this.props.handler(results);
        }
    else{
    
    // this.setState({ method:fetchMethod ,url:urlValue });

    let results = {method:fetchMethod , url:urlValue};

    this.props.handler(results);

    }
    }
    render(){
        return (
            <main>
                <form action="">
                <label htmlFor="">URL :</label> 
                <input type="url" placeholder="Input URL here" onChange={this.urlFetcher} /> 
                <button onClick={this.buttonHandler} id="go-btn">Go</button> 
                
            <button value="GET" onClick ={this.methodFetcher} id="click-btn"> Get</button>
            <button value="POST"  onClick ={this.methodFetcher} id="click-btn"> Post</button>
            <button value="PUT"  onClick ={this.methodFetcher}id="click-btn"> Put</button>
            <button value="DELETE"  onClick ={this.methodFetcher}id="click-btn"> Delete</button>

                </form>
            </main>
        );
    }
};
export default Form;