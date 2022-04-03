import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FormGroup, Label, InputGroup, Input, InputGroupText, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../helper';
import { CgSmileSad } from "react-icons/cg";
import { FaRegSmileBeam } from "react-icons/fa";



class ProfileManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassType: "password",
            newPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            toastOpen: "",
            toastHeader: "",
            toastMessage: "",
            toastIcon: "",
            newPassword: ""
        }
    }

    btShowPass = () => {
        if (this.state.newPassType == "password") {
            this.setState({
                newPassShow: <MdVisibility sx={{ fontSize: 16 }} />,
                newPassType: "text"
            })
        } else {
            this.setState({
                newPassShow: <MdVisibilityOff sx={{ fontSize: 16 }} />,
                newPassType: "password"
            })
        }
    }

    btSubmit = async () => {
        if (this.newConfPassword.value == "" || this.newPassword.value == "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Oh no...",
                toastIcon: <CgSmileSad style={{ fontSize: 20 }} />,
                toastMessage: "Please fill all the blank."
            })
        } else {
            if (this.newConfPassword.value === this.newPassword.value) {
                let token = localStorage.getItem("data")
                let res = await axios.post(`${API_URL}/users/changepassword`, { newPassword: this.newConfPassword.value }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                try {
                    if (res.data.success) {
                        this.setState({
                            toastOpen: true,
                            toastHeader: "Yeay...",
                            toastMessage: "Change password success.",
                            toastIcon: <FaRegSmileBeam style={{ fontSize: 20 }} />
                        })
                        this.newPassword.value = ""
                        this.newConfPassword.value = ""
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Oh no...",
                    toastIcon: <CgSmileSad style={{ fontSize: 20 }} />,
                    toastMessage: "Password doesn't match."
                })
            }
        }

    }

    render() {
        return (
            <div className='container-fluid pt-3 pb-5' style={{ backgroundColor: '#FCFBFA', height: '72vh' }} >
                <Toast isOpen={this.state.toastOpen} style={{ float: 'right', marginRight: 40 }}>
                    <ToastHeader icon={this.state.toastIcon}
                        toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>
                </Toast>
                <div className='container shadow' style={{ backgroundColor: 'white', borderRadius: 50, padding: 60, width: "40%", height: '65vh' }}>
                    <p className='heading2 pb-3'>Profile Management</p>
                    <Tabs size='md' colorScheme='#231953'>
                        <>
                            <TabList>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Account information</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Change password</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel>
                                    <FormGroup >
                                        <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Email</Label>
                                        <InputGroup>
                                            <Input bsSize='sm' type="text" id="textEmail" placeholder="Your email"
                                                innerRef={(element) => this.email = element} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Username</Label>
                                        <InputGroup>
                                            <Input bsSize='sm' type="text" id="textUsername" placeholder="Your username"
                                                innerRef={(element) => this.username = element} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Address</Label>
                                        <InputGroup>
                                            <Input bsSize='sm' type="text" id="textAddress" placeholder="Address"
                                                innerRef={(element) => this.username = element} />
                                        </InputGroup>
                                    </FormGroup>
                                    <button className='landing1 text-center py-2 mt-4' style={{ width: '20%' }}>
                                        <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Save</p>
                                    </button>
                                </TabPanel>
                                <TabPanel>
                                    <FormGroup >
                                        <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>New password</Label>
                                        <InputGroup>
                                            <Input bsSize='sm' type={this.state.newPassType} id="textPassword" placeholder="Password" style={{ borderRight: "0px" }}
                                                innerRef={(element) => this.newConfPassword = element} />
                                            <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPass}>
                                                {this.state.newPassShow}
                                            </InputGroupText>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Re-type new password</Label>
                                        <InputGroup>
                                            <Input bsSize='sm' type={this.state.newPassType} id="textConfPassword" placeholder="Confirm password" style={{ borderRight: "0px", width: '70%' }}
                                                innerRef={(element) => this.newPassword = element} />
                                            <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPass}>
                                                {this.state.newPassShow}
                                            </InputGroupText>
                                        </InputGroup>
                                    </FormGroup>
                                    <button className='landing1 text-center py-2 mt-4' style={{ width: '20%' }} onClick={this.btSubmit}>
                                        <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Save</p>
                                    </button>
                                </TabPanel>
                            </TabPanels>
                        </>
                    </Tabs>
                </div>

            </div>
        );
    }
}

export default ProfileManagement;