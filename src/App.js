import React from 'react';
import './App.scss';
import Header from './header'
import Form from './form'
import Results from './results'
import Footer from './footer'


class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          results: [],
          count: 0
      }
  }

  handleForm = (results, count) => {
      console.log('from the parent handler', count);
      this.setState({ results, count });
  }

 render() {
  return (
    <React.StrictMode>
   <div>
    <Header />
    <Form handler={this.handleForm} />
    <Results results={this.state.results} />
    <Footer />

    </div>
    </React.StrictMode>
   );
}
}

export default App;
