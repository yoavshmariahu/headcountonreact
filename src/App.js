import React from 'react';
import Home from './Components/Home'
import AboutPage from './Components/AboutPage'
import HowItWorksPage from './Components/HowItWorksPage'
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
      <div>
        <Header/>
        <Switch>
          <Route path="/how-it-works">
            <HowItWorksPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
