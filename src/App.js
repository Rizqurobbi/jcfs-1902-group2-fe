import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import FooterComponent from './Components/Footer';
import NavbarComponent from './Components/Navbar';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import LandingPage from './Pages/LandingPage';
import RegisterPage from './Pages/RegisterPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import VerificationPage from './Pages/VerificationPage';
import ProductPage from './Pages/ProductPage';
import ProductDetail from './Pages/ProductDetail';
import { loginAction, keepAction } from './redux/actions'
import { getCategory,getUnit } from './redux/actions/productsAction';
import ProductManagement from './Pages/ProductManagement';
import ProfileManagement from './Pages/EditProfilePage';
import CartPage from './Pages/CartPage';
import NotFoundPage from './Pages/NotFoundPage';
import DoctorPrescriptionPage from './Pages/DoctorPrescription';
import HistoryTransaction from './Pages/HistoryTransaction';
import TransactionManagement from './Pages/TransactionsManagement';
import AboutUs from './Pages/Aboutus';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.keepLogin()
    this.props.getCategory()
    this.props.getUnit()
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
          <Route path="/reset" element={<ForgotPasswordPage />} />
          <Route path="/reset/:token" element={<ResetPasswordPage />} />
          <Route path='/products' element={<ProductPage />} />
          <Route path='/products-detail' element={<ProductDetail />} />
          <Route path='/doctorsprescription' element={<DoctorPrescriptionPage/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          {
            this.props.role == "User" ?
              <>
                <Route path="/cart-user" element={<CartPage/>} />
                <Route path="/edit" element={<ProfileManagement />} />
                <Route path="/history" element={<HistoryTransaction />} />
              </>
              :
              this.props.role == "Admin" ?
                <>
                  <Route path="/product-management" element={<ProductManagement />} />
                  <Route path="/transactions-management" element={<TransactionManagement />} />
                </>
                :
                <Route path="*" element={<NotFoundPage />} />
          }
        </Routes>
        <FooterComponent />
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { keepAction, getCategory, getUnit })(App);