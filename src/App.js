import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import RegisterPage from './Pages/RegisterPage';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
