import React, { Component } from 'react';
import { FormGroup, Modal, ModalBody, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import logo from '../img/logofix.png'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { connect } from 'react-redux';
import { getCartAction, loginAction } from '../redux/actions'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';



class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logPassType: "password",
            logPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            redirect: false
        }
    }

    btShowPassLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: <MdVisibility sx={{ fontSize: 16 }} />,
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: <MdVisibilityOff sx={{ fontSize: 16 }} />,
                logPassType: "password"
            })
        }
    }

    btLogin = async () => {
        try {
            let res = await this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
            if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Fill all the blank',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    width: '23%'
                })
            } else {
                if (res) {
                    await this.setState({ redirect: true })
                    this.props.getCartAction()
                    this.props.btClose()
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Account not exist.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        width: '23%'
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            this.setState({
                redirect: false
            })
            return <Navigate to="/" />
        }
        return (
            <div>
                <Modal size='md' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                    <div className='container px-5' style={{ backgroundColor: '#FCFBFA' }} >
                        <ModalBody className='px-5 pt-5'>
                            <p className='heading2 m-0' style={{ fontSize: 24 }}>Welcome back</p>
                            <p className='heading4 text-muted' style={{ fontSize: 12 }}>Welcome back! Please enter your details</p>
                            <FormGroup style={{ width: '100%', margin: 'auto' }}>
                                <Label className='heading4' style={{ fontSize: 12 }}>Email/Username</Label>
                                <InputGroup>
                                    <Input size='sm' type="text" id="textNama" placeholder="Email/username"
                                        innerRef={(element) => this.emailLogin = element} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup style={{ width: '100%', margin: 'auto' }}>
                                <Label className='heading4' style={{ fontSize: 12 }}>Password</Label>
                                <InputGroup>
                                    <Input size='sm' type={this.state.logPassType} id="textPassword" placeholder="password" style={{ borderRight: "0px" }}
                                        innerRef={(element) => this.passwordLogin = element} />
                                    <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassLogin}>
                                        {this.state.logPassShow}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                            <Link to='/reset' onClick={this.props.btClose}>
                                <div style={{ textAlign: 'right' }}>
                                    <p className='heading4' style={{ fontSize: 12, cursor: 'pointer' }}>Forgot password?</p>
                                </div>
                            </Link>
                            <div className='NavbarButton' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer',  }} onClick={this.btLogin}>
                                <button>Submit</button>
                            </div>
                            <div className='d-flex my-2' style={{ justifyContent: 'center' }}>
                                <p className='heading4' style={{ fontSize: 12, marginRight: 5 }}>Don't have account? </p>
                                <Link to='/register' onClick={this.props.btClose}>
                                    <p className='heading4' style={{ fontSize: 12, cursor: 'pointer', fontWeight: 800 }}>Sign up for free</p>
                                </Link>
                            </div>
                            <img src={logo} width="40%" className="m-auto pt-4 pb-3 " />
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { loginAction,getCartAction })(LoginComponent);