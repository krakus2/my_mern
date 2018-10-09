import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {
   render() {
      return (
         <Router>
            <React.Fragment>
               <Navbar />
               <Route exact path="/" component={Landing} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/register" component={Register} />
               <Footer />
            </React.Fragment>
         </Router>
      );
   }
}

export default App;
