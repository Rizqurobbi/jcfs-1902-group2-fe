import React, { Component } from 'react';
import reset from '../img/forgotpassword.png'
import { FormGroup, Label, InputGroup, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../helper';
import { CgSmileSad  } from "react-icons/cg";
import { FaRegSmileBeam } from "react-icons/fa";

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
        }
    }

    btSubmit = () => {
        if (this.emailForgot.value.includes('@')) {
            axios.post(`${API_URL}/users/forgot`, { email: this.emailForgot.value })
                .then(res => {
                    if (res.data.success) {
                        this.setState({
                            toastOpen: true,
                            toastHeader: "Register Success",
                            toastMessage: "Please check your email to change password",
                            toastIcon: <FaRegSmileBeam style={{fontSize: 20}}/>
                        })
                        this.emailForgot.value = ""
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            this.setState({
                toastOpen: true,
                toastHeader: "Oh no...",
                toastIcon: <CgSmileSad style={{fontSize: 20}}/>,
                toastMessage: "Email Incorrect"
            })
        }
    }

    render() {
        return (
            <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA', height: '72vh', paddingTop: 60 }}>
                <Toast isOpen={this.state.toastOpen} style={{ float: 'right', marginRight: 40 }}>
                    <ToastHeader icon={this.state.toastIcon}
                        toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>
                </Toast>
                <div className='container shadow ' style={{ backgroundColor: 'white', borderRadius: 50, padding: 60, width: "50%" }}>
                    <img className="rounded fade-in m-auto" src={reset} width="10%" />
                    <div className='text-center'>
                        <p className='heading2' style={{ fontSize: 30 }}>Reset Your Password</p>
                        <p className='heading4' style={{ marginLeft: 200, marginRight: 200, fontSize: 16, marginBottom: 25 }}>
                            Please insert your email for your account. We will sent a link to reset your password.
                        </p>
                        <FormGroup style={{ width: "50%", margin: 'auto' }} >
                            <InputGroup>
                                <Input bsSize='sm' type="text" id="textEmail" placeholder="Your email"
                                    innerRef={(element) => this.emailForgot = element} />
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='NavbarButton' style={{ margin: 'auto', textAlign: 'center', width: "20%", marginTop: 20 }}>
                        <button className='py-2' onClick={this.btSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPasswordPage;