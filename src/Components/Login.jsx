import React, { Component } from 'react';
import { FormGroup, Modal, ModalBody, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import logo from '../img/logofix.png'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions'
import { Link } from 'react-router-dom';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logPassType: "password",
            logPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
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

    btLogin = () => {
        this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
        this.props.btClose()
    }

    render() {
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
                            <div className='NavbarButton' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer' }} onClick={this.btLogin}>
                                <button className='py-2' >Submit</button>
                            </div>
                            <div className='d-flex my-2' style={{ justifyContent: 'center' }}>
                                <p className='heading4' style={{ fontSize: 12, marginRight: 5 }}>Don't have account? </p>
                                <p className='heading4' style={{ fontSize: 12, cursor: 'pointer', fontWeight: 800 }}>Sign up for free</p>
                            </div>
                            <img src={logo} width="40%" className="m-auto pt-4 pb-3 " />
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { loginAction })(LoginComponent);