import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Label, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Dropdown } from 'reactstrap';
import { Button, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { SearchIcon, PhoneIcon } from '@chakra-ui/icons';
import logo from '../img/logofix.png'
import LoginComponent from './Login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { logOutAction } from '../redux/actions';
import { BsCart4 } from "react-icons/bs";
class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalLogin: false
        }
    }
    render() {
        console.log('role', this.props.role)
        return (
            <div style={{ backgroundColor: '#FCFBFA' }}>
                <Navbar expand='md' className='container py-4 d-flex'>
                    <LoginComponent
                        modalOpen={this.state.modalLogin}
                        btClose={() => this.setState({ modalLogin: !this.state.modalLogin })}
                    />
                    <NavbarBrand className='d-flex' style={{ width: "45%" }}>
                        <div style={{ width: "25%", paddingTop: 3 }}>
                            <Link to="/">
                                <img src={logo} width="100%" />
                            </Link>
                        </div>
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
                            <Link to="/products">
                                <p className='NavbarHeader'>Our Products</p>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/doctorsprescription'>
                                <p className='NavbarHeader'>Order by Recipes</p>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/aboutus'>
                                <p className='NavbarHeader'>About Us</p>
                            </Link>
                        </NavItem>
                    </Nav>
                    {
                        this.props.username ?
                            <div>
                                <UncontrolledDropdown className='d-flex'>
                                    <DropdownToggle outline caret className='NavbarButton' style={{ border: 0, borderRadius: 10 }}>
                                        Hello, <b className='mx-1' style={{ fontSize: 16 }}>{this.props.username}</b>
                                    </DropdownToggle>
                                    {this.props.role == 'User' ?
                                        <DropdownMenu DropdownMenu className='heading4'
                                        >
                                            <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                <DropdownItem className='d-flex'>
                                                    Carts {
                                                        this.props.carts.length > 0 ?
                                                            <>
                                                                < BsCart4 style={{ marginLeft: '2px', marginTop: '3.8px' }} /> <span style={{ backgroundColor: '#E63E54', color: 'white', borderRadius: '50%', paddingLeft: '5.3px', paddingRight: '5.3px', paddingTop: '1.4px', fontSize: 11, textAlign: 'center' }}>{this.props.carts.length}</span>
                                                            </>
                                                            :
                                                            null
                                                    }
                                                </DropdownItem>
                                            </Link>
                                            <Link to='/history'>
                                                <DropdownItem>
                                                    Transaction History
                                                </DropdownItem>
                                            </Link>
                                            <Link to='/edit'>
                                                <DropdownItem>
                                                    My Profile
                                                </DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                            <Link to='/'>
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logOutAction();
                                                }}>
                                                    Logout
                                                </DropdownItem>
                                            </Link>

                                        </DropdownMenu>
                                        :
                                        <DropdownMenu DropdownMenu className='heading4'
                                        >
                                            <DropdownItem>
                                                <Link to='/product-management'>
                                                    Products Management
                                                </Link>
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to='/transactions-management'>
                                                    Transactions Management
                                                </Link>
                                            </DropdownItem>
                                            <Link to='/sales-report'>
                                                <DropdownItem>
                                                    Sales Report
                                                </DropdownItem>
                                            </Link>
                                            <DropdownItem divider />
                                            <Link to='/'>
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logOutAction();
                                                }}>
                                                    Logout
                                                </DropdownItem>
                                            </Link>
                                        </DropdownMenu>
                                    }
                                </UncontrolledDropdown>
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
            </div >
        );
    }
}

const mapToProps = (state) => {
    return {
        carts: state.transactionsReducer.carts,
        username: state.userReducer.username,
        role: state.userReducer.role,
        imageurl: state.userReducer.imageurl
    }
}

export default connect(mapToProps, { logOutAction })(NavbarComponent);
