import React, { Component } from 'react';
import reset from '../img/forgotpassword.png'
import { FormGroup, Label, InputGroup, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../helper';
import Swal from 'sweetalert2';

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    btSubmit = () => {
        if (this.emailForgot.value.includes('@')) {
            axios.post(`${API_URL}/users/forgot`, { email: this.emailForgot.value })
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Please kindly check your email to to reset your password.',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        this.emailForgot.value = ""
                    }
                }).catch(error => {
                    console.log(error)
                })
        } else {
            Swal.fire({
                title: 'Warning!',
                text: `Email doesn't exist.`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }

    render() {
        return (
            <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA', height: '72vh', paddingTop: 60 }}>
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