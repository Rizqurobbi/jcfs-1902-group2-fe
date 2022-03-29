import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Label } from 'reactstrap';
import { Button, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon, PhoneIcon } from '@chakra-ui/icons';
import logo from '../img/logofix.png'
import LoginComponent from './Login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalLogin: false
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: '#FCFBFA' }}>
                <Navbar expand='md' className='container py-4 d-flex'>
                    <LoginComponent
                        modalOpen={this.state.modalLogin}
                        btClose={() => this.setState({ modalLogin: !this.state.modalLogin })}
                    />
                    <NavbarBrand className='d-flex' style={{ width: "45%" }}>
                        <div style={{ width: "25%", paddingTop: 3 }}>
                            <img src={logo} width="100%" />
                        </div>
                        {/* <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '30px' }}>Farmacia</p> */}
                        <Nav className='mx-3'>
                            <InputGroup style={{ borderRadius: 50 }} >
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<SearchIcon color='gray.300' />}
                                />
                                <Input type='tel' placeholder='Search' />
                            </InputGroup>
                        </Nav>
                    </NavbarBrand>
                    <Nav style={{ marginRight: -40 }}>
                        <NavItem>
                            <Link to="/">
                                <p className='NavbarHeader'>Home</p>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <p className='NavbarHeader'>Our Products</p>
                        </NavItem>
                        <NavItem>
                            <Link to='/verify'>
                                <p className='NavbarHeader'>Buy by Recipes</p>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <p className='NavbarHeader'>About Us</p>
                        </NavItem>
                    </Nav>
                    {
                        this.props.username ?
                            <div style={{ width: "10%" }}>
                                <div className='d-flex'>
                                    <img src={this.props.imageurl} style={{ width: "40%" }} />
                                    <b className='heading2 mt-2 mx-2' style={{ fontSize: 16}}>{this.props.username}</b>
                                </div>
                            </div>
                            :
                            <div className='d-flex'>
                                <button className='NavbarButton py-2' style={{ marginRight: 10 }} onClick={() => this.setState({ modalLogin: !this.state.modalLogin })}>Login</button>
                                <Link to="/register">
                                    <button className='landing1 py-2' >Register</button>
                                </Link>
                            </div>
                    }
                </Navbar>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        imageurl: state.userReducer.imageurl
    }
}

export default connect(mapToProps)(NavbarComponent);