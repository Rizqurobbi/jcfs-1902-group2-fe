import React, { Component } from 'react';
import logo from '../img/logofix.png'
import { AiFillFacebook, AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai"
import { Link } from 'react-router-dom';
class FooterComponent extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (
            <div style={{ backgroundColor: 'white' }} className="footer">
                <div style={{ paddingTop: '5px' }} className='container'>
                    <div className='row'>
                        <div className='col-md-8 py-4'>
                            <div style={{ width: "25%", paddingTop: 3, paddingBottom: 8 }}>
                                <img src={logo} width="100%" />
                            </div>
                            <p className='footerFont'>©Farmacia, 2022. All Rights Reserved</p>
                        </div>
                        <div className='col-md-4' style={{ paddingTop: 31 }}>
                            <div className='d-flex' style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                                <Link to='/products'>
                                    <p className='footerFont'>Our Products</p>
                                </Link>
                                <Link to='/doctorsprescription'>
                                    <p className='footerFont'>Buy by Recipes</p>
                                </Link>
                                <Link to='/contactus'>
                                    <p className='footerFont'>Contact</p>
                                </Link>
                                <Link to='/aboutus'>
                                    <p className='footerFont'>About Us</p>
                                </Link>
                            </div>
                            <div className='d-flex' style={{ float: 'right' }}>
                                <p className='footerFont' style={{ marginRight: 15 }}>Find us on: </p>
                                <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '20px' }}><AiFillFacebook /></p>
                                <p style={{ color: '#1A8CD8', fontWeight: 'bolder', fontSize: '20px' }}><AiFillTwitterCircle /></p>
                                <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '20px' }}><AiOutlineInstagram /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;