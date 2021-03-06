import React from 'react';
import Home from './Components/Home'
import Contact from './Components/Contact'
import HowItWorksPage from './Components/HowItWorksPage'
import ForStores from './Components/ForStores'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';

function App() {
  return (
    <Router>
        <Header/>

        <Switch>
          <Route path="/how-it-works">
            <HowItWorksPage />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/for-stores">
            <ForStores />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

    </Router>
  );
}

export default App;
