import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, InputGroup, Input, InputGroupText, Toast, ToastHeader, ToastBody } from 'reactstrap';
import photo1 from '../img/photo2.jpg'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../helper';
import { FaRegSmileBeam } from "react-icons/fa";
import LoginComponent from '../Components/Login';
import Swal from 'sweetalert2';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Navigate } from 'react-router-dom';


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regPassType: "password",
            regPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            modalLogin: false,
            password: '',
            redirect: false
        }
    }

    btShowPassRegis = () => {
        if (this.state.regPassType == "password") {
            this.setState({
                regPassShow: <MdVisibility sx={{ fontSize: 16 }} />,
                regPassType: "text"
            })
        } else {
            this.setState({
                regPassShow: <MdVisibilityOff sx={{ fontSize: 16 }} />,
                regPassType: "password"
            })
        }
    }

    btRegister = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        })
        if (this.usernameRegis.value === "" || this.emailRegis.value === "" || this.confPasswordRegis.value === "") {
            Swal.fire({
                title: 'Warning!',
                text: 'Please fill all the blank.',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {
            if (this.state.password === this.confPasswordRegis.value) {
                let data = {
                    idrole: 2,
                    idstatus: 1,
                    email: this.emailRegis.value,
                    username: this.usernameRegis.value,
                    password: this.state.password
                }
                if (this.emailRegis.value.includes("@")) {
                    axios.post(`${API_URL}/users/register`, data)
                        .then(res => {
                            if (res.data.success) {
                                Swal.fire({
                                    title: 'Register Success',
                                    text: 'Please kindly check your email to verify.',
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                })
                                this.emailRegis.value = ""
                                this.usernameRegis.value = ""
                                this.confPasswordRegis.value = ""
                                this.setState({ password: "", redirect: true })
                            } else {
                                Swal.fire({
                                    title: 'Warning!',
                                    text: 'Email does exist.',
                                    icon: 'warning',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                } else {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'Email incorrect.',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    })
                }
            } else {
                Swal.fire({
                    title: 'Warning!',
                    text: `Password doesn't match.`,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/'/>
        }
        return (
            <div className='container-fluid pt-3 pb-5' style={{ backgroundColor: '#FCFBFA' }} >
                <LoginComponent
                    modalOpen={this.state.modalLogin}
                    btClose={() => this.setState({ modalLogin: !this.state.modalLogin })}
                />
                <div className='container shadow' style={{ backgroundColor: 'white', borderRadius: 50, padding: 60, paddingLeft: 150 }}>
                    <Row>
                        <Col xs='4' className='m-auto'>
                            <div className='d-flex heading4' style={{ fontSize: 12 }}>
                                <p className='text-muted' style={{ marginRight: 5 }}>Already member? </p>
                                <p style={{ fontWeight: 900, cursor: 'pointer' }} onClick={() => this.setState({ modalLogin: !this.state.modalLogin })}>Sign In </p>
                            </div>
                            <p className='heading2'>Let's Get Started</p>
                            <p className='heading4 text-muted' style={{ fontSize: 12 }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima recusandae, minus facilis consectetur totam nihil sapiente eveniet quidem.</p>
                            <div>
                                <FormGroup >
                                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Email</Label>
                                    <InputGroup>
                                        <Input bsSize='sm' type="text" id="textEmail" placeholder="Your email"
                                            innerRef={(element) => this.emailRegis = element} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup >
                                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Username</Label>
                                    <InputGroup>
                                        <Input bsSize='sm' type="text" id="textUsername" placeholder="Your username"
                                            innerRef={(element) => this.usernameRegis = element} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup >
                                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Password</Label>
                                    <InputGroup>
                                        <Input bsSize='sm' type={this.state.regPassType} id="textPassword" placeholder="Password" style={{ borderRight: "0px" }}
                                            onChange={(event) => this.setState({ password: event.target.value })}/>
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                    <PasswordStrengthBar className='my-2' password={this.state.password} />
                                </FormGroup>
                                <FormGroup style={{marginTop: -20}} >
                                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Re-Type Password</Label>
                                    <InputGroup>
                                        <Input bsSize='sm' type={this.state.regPassType} id="textConfPassword" placeholder="Confirm password" style={{ borderRight: "0px", width: '70%' }}
                                            innerRef={(element) => this.confPasswordRegis = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <div className='NavbarButton' style={{ textAlign: 'center', width: '50%', marginTop: 40, cursor: 'pointer' }} onClick={this.btRegister}>
                                    <button className='py-1'>Submit</button>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <img src={photo1} width="70%" style={{ borderRadius: 20, margin: 'auto' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default RegisterPage;