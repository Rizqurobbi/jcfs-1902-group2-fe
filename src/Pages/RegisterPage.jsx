import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, InputGroup, Input, InputGroupText, Toast, ToastHeader, ToastBody } from 'reactstrap';
import photo1 from '../img/photo2.jpg'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../helper';


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regPassType: "password",
            regPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: ""
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
        if (this.usernameRegis.value === "" || this.emailRegis.value === "" || this.passwordRegis.value === "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register",
                toastMessage: "Fill all the blank",
                toastIcon: "warning"
            })
        } else {
            if (this.passwordRegis.value === this.confPasswordRegis.value) {
                let data = {
                    idrole: 2,
                    idstatus: 1,
                    email: this.emailRegis.value,
                    username: this.usernameRegis.value,
                    password: this.passwordRegis.value
                }
                if (this.emailRegis.value.includes("@")) {
                    axios.post(`${API_URL}/users/register`, data)
                        .then(res => {
                            if (res.data.success) {
                                this.setState({
                                    toastOpen: true,
                                    toastHeader: "Register Success",
                                    toastMessage: "Check your email! :)",
                                    toastIcon: "success"
                                })
                                this.emailRegis.value = ""
                                this.usernameRegis.value = ""
                                this.passwordRegis.value = ""
                                this.confPasswordRegis.value = ""
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                } else {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastMessage: "Email Incorrect"
                    })
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastMessage: "Password tidak sesuai"
                })
            }
        }
    }

    render() {
        return (
            <div className='container-fluid pt-3 pb-5' style={{ backgroundColor: '#FCFBFA' }} >
                <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                    <ToastHeader icon={this.state.toastIcon}
                        toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>
                </Toast>
                <div className='container shadow' style={{ backgroundColor: 'white', borderRadius: 50, padding: 60, paddingLeft: 150 }}>
                    <Row>
                        <Col xs='4' className='m-auto'>
                            <div className='d-flex heading4' style={{ fontSize: 12 }}>
                                <p className='text-muted' style={{ marginRight: 5 }}>Already member? </p>
                                <p style={{ fontWeight: 900, cursor: 'pointer' }}>Sign In </p>
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
                                            innerRef={(element) => this.confPasswordRegis = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup >
                                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Re-Type Password</Label>
                                    <InputGroup>
                                        <Input bsSize='sm' type={this.state.regPassType} id="textConfPassword" placeholder="Confirm password" style={{ borderRight: "0px", width: '70%' }}
                                            innerRef={(element) => this.passwordRegis = element} />
                                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                            {this.state.regPassShow}
                                        </InputGroupText>
                                    </InputGroup>
                                </FormGroup>
                                <div className='NavbarButton' style={{ textAlign: 'center', width: '70%', marginTop: 40, cursor: 'pointer' }} onClick={this.btRegister}>
                                    <button className='py-2' >Submit</button>
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