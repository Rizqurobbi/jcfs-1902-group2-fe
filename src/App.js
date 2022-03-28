import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductPage from './Pages/ProductPage';
import React from 'react';
import NavbarComponent from './Components/Navbar';
import FooterComponent from './Components/Footer';
import ProductDetail from './Pages/ProductDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/products-detail' element={<ProductDetail/>}/>
        </Routes>
        <FooterComponent/>
      </div>
     );
  }
}
 

export default App;
