import React from 'react';
import './App.scss';
import { BrowserRouter as Router, HashRouter, MemoryRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './home'
import History from './history'
import Help from './help'
import Header from './header'
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
    Switch
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/"  > <Home />  </Route>
                    <Route exact path="/help"   > <Help /> </Route>
                    <Route exact path="/history"  > <History /> </Route>
                </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;
