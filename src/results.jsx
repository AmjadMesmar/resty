import React from 'react';
import './results.scss'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
let JSONPrettyMon = require('react-json-pretty/dist/monikai');

class Results extends React.Component {
    render() {
        return (
            <React.Fragment>
                
                    {
                        <JSONPretty id="json-pretty" data={this.props.results} theme={JSONPrettyMon}></JSONPretty>
                    }

            </React.Fragment>
        )
    }
}

export default Results;
