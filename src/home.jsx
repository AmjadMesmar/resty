import React from 'react';
import './App.scss';
import { BrowserRouter as Router} from 'react-router-dom';
import Form from './form'
import Results from './results'
import History from './history'


class Home extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          results: [],
          count: 0
      }
  }

  handleForm = (results, count) => {
      this.setState({ results, count });
  }

 render() {
  return (
    <Router>
   <div>
    <Form handler={this.handleForm} />
    <div id="show-data">
    <History/>
    <Results results={this.state.results} />
    </div>

    </div>
    </Router>
   );
}
}

export default Home;
