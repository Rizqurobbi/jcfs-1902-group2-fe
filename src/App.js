import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import RegisterPage from './Pages/RegisterPage';
import VerificationPage from './Pages/VerificationPage';
import ProductPage from './Pages/ProductPage';
import ProductDetail from './Pages/ProductDetail';
import { loginAction, keepAction } from './redux/actions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = async () => {
    try {
      let res = await this.props.keepAction()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify/:token" element={<VerificationPage />} />
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/products-detail' element={<ProductDetail/>}/>
        </Routes>
        <FooterComponent />
      </div>
    );
  }
}
 

export default connect(null, { keepAction }) (App);
