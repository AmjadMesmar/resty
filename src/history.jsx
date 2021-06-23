import React from 'react'
import './history.scss'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/acai.css';
let JSONPrettyMon = require('react-json-pretty/dist/acai');

class History extends React.Component {

    render() {
        return (
            <React.Fragment>
                
                    {
                        <JSONPretty id="history" data={this.props.results} theme={JSONPrettyMon}></JSONPretty>
                    }

            </React.Fragment>
        )
    }
}

export default History;