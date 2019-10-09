import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Navbar/>
          {this.props.children}
      </div>
    );
  }
}

export default App;
