import React, { Component } from 'react';
import { resetPassword } from '../redux/actions';
import { connect } from 'react-redux';
import { FormGroup, Label, InputGroup, Input, InputGroupText } from 'reactstrap';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import ResetPasswordModal from '../Components/ResetSuccess';
import PasswordStrengthBar from 'react-password-strength-bar';

class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPassType: "password",
            resetPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            modalReset: false,
            redirect: false,
            password: ''
        }
    }

    btShowPassRegis = () => {
        if (this.state.resetPassType == "password") {
            this.setState({
                resetPassShow: <MdVisibility sx={{ fontSize: 16 }} />,
                resetPassType: "text"
            })
        } else {
            this.setState({
                resetPassShow: <MdVisibilityOff sx={{ fontSize: 16 }} />,
                resetPassType: "password"
            })
        }
    }

    resetPass = async () => {
        if (this.state.password === this.confPassReset.value) {
            try {
                let res = await this.props.resetPassword(this.state.password)
                if (res.success) {
                    this.setState({
                        modalReset: !this.state.modalReset
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        return (
            <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA', height: '72vh', paddingTop: 100 }}>
                <ResetPasswordModal
                    modalOpen={this.state.modalReset}
                    btClose={() => this.setState({ modalReset: !this.state.modalReset })}
                />
                <div className='container shadow ' style={{ backgroundColor: 'white', borderRadius: 50, padding: 60, width: "50%" }}>
                    <div className='text-center my-2'>
                        <p className='heading2'>Reset Password</p>
                        <p className='heading4' style={{ marginLeft: 200, marginRight: 200 }}>Please input your new password here.</p>
                        <FormGroup style={{ width: '40%', margin: 'auto' }} >
                            <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>New Password</Label>
                            <InputGroup>
                                <Input bsSize='sm' type={this.state.resetPassType} id="textPassword" placeholder="Password" style={{ borderRight: "0px" }}
                                    onChange={(event) => this.setState({ password: event.target.value })}
                                    innerRef={(element) => this.passReset = element} />
                                <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                    {this.state.resetPassShow}
                                </InputGroupText>
                            </InputGroup>
                            <PasswordStrengthBar className='my-2' password={this.state.password} />
                        </FormGroup>
                        <FormGroup style={{ width: '40%', margin: 'auto', marginTop: -15 }}>
                            <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Re-Type New Password</Label>
                            <InputGroup>
                                <Input bsSize='sm' type={this.state.resetPassType} id="textConfPassword" placeholder="Confirm password" style={{ borderRight: "0px", width: '70%' }}
                                    innerRef={(element) => this.confPassReset = element} />
                                <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPassRegis}>
                                    {this.state.resetPassShow}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className='NavbarButton' style={{ margin: 'auto', textAlign: 'center', width: "20%", marginTop: 40, cursor: 'pointer' }} onClick={this.resetPass}>
                        <button className='py-2'>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { resetPassword })(VerificationPage);