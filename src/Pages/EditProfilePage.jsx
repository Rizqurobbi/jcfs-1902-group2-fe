import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FormGroup, Label, InputGroup, Input, InputGroupText, Toast, ToastBody, ToastHeader, Row, Col } from 'reactstrap';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../helper';
import { CgSmileSad } from "react-icons/cg";
import { FaRegSmileBeam } from "react-icons/fa";
import { connect } from 'react-redux';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddAddress from '../Components/AddAddress';
import EditAddress from '../Components/EditAddress';



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
            newPassword: "",
            edit: false,
            images: [''],
            modalAdd: false,
            modalEdit: false,
            address: "",
            idx: 0
        }
    }

    btShowPass = () => {
        if (this.state.newPassType === "password") {
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
        if (this.newConfPassword.value === "" || this.newPassword.value === "") {
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
    handleImages = (e) => {
        this.setState({ images: { name: e.target.files[0].name, file: e.target.files[0] } })
    }


    btSave = () => {
        let formData = new FormData()
        let data = {
            fullname: this.inFullname.value,
            username: this.inUsername.value,
            age: this.inAge.value,
            email: this.inEmail.value,
            gender: this.inGender.value
        }
        formData.append(`data`, JSON.stringify(data))
        formData.append('Images', this.state.images.file)
        let token = localStorage.getItem("data")
        axios.patch(`${API_URL}/users/editprofile`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            this.setState({ edit: false })
            window.location.reload();
            alert('Edit Profile Success')
        }).catch(err => {
            console.log(err)
        })
    }

    btDeleteAddress = (index) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            let token = localStorage.getItem("data")
            axios.delete(`${API_URL}/users/${index}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log('cancelled', index)
        }
    }

    printAddress = () => {
        if (this.props.address) {
            return this.props.address.map((value, index) => {
                return <div className='container py-4 px-5 my-4 d-flex heading4 justify-content-between' style={{ backgroundColor: 'white', border: '2px solid lightgray', borderRadius: 50 }}>
                    <div className='d-flex py-2'>
                        <p className='mx-2'>{index + 1}. </p>
                        <p>{value.address}</p>
                    </div>
                    <div className='d-flex'>
                        <span title='Edit' className='my-2' style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => this.setState({ modalEdit: !this.state.modalEdit, address: value.address, idx: value.idaddress })}><FiEdit /></span>
                        <span title='Remove Address' className='my-2 mx-2' style={{ fontSize: 20, color: '#E63E54', cursor: 'pointer' }} onClick={() => this.btDeleteAddress(value.idaddress)} ><FiTrash2 /></span>
                    </div>
                </div>
            })
        }
    }

    render() {
        return (
            <div className='container-fluid pt-4 pb-5' style={{ backgroundColor: '#FCFBFA', height: '93vh' }} >
                <Toast isOpen={this.state.toastOpen} style={{ float: 'right', marginRight: 40 }}>
                    <ToastHeader icon={this.state.toastIcon}
                        toggle={() => this.setState({ toastOpen: false })}>
                        {this.state.toastHeader}
                    </ToastHeader>
                    <ToastBody>
                        {this.state.toastMessage}
                    </ToastBody>
                </Toast>
                <AddAddress
                    modalOpen={this.state.modalAdd}
                    btClose={() => this.setState({ modalAdd: !this.state.modalAdd })}
                />
                <EditAddress
                    modalOpen={this.state.modalEdit}
                    btClose={() => this.setState({ modalEdit: !this.state.modalEdit })}
                    address={this.state.address}
                    idx={this.state.idx}
                />
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, height: '82vh', paddingTop: 80 }}>
                    <p className='heading2 pb-2' style={{ paddingLeft: 30 }}>Profile Management</p>
                    <Row>
                        <Col xs='4'>
                            {
                                this.state.images.file ?
                                    <img src={URL.createObjectURL(this.state.images.file)} className='m-auto' style={{ width: '80%', paddingBottom: 20, paddingTop: 80 }} />
                                    :
                                    <img src={this.props.imageurl.includes("http") ? this.props.imageurl : API_URL + this.props.imageurl} width="80%" className='m-auto' style={{ paddingBottom: 20, paddingTop: 80 }} />
                            }
                            {
                                this.state.edit ?
                                    <div>
                                        <Input style={{ width: 'auto', marginTop: 20, margin: 'auto' }} type="file" onChange={(e) => this.handleImages(e)} innerRef={(e) => this.inImage = e} />
                                        {/* {
                                            this.state.images.file ?
                                                <img src={URL.createObjectURL(this.state.images.file)} style={{ width: '40%', marginTop: 20, marginBottom: 20 }} />
                                                :
                                                null
                                        } */}
                                    </div>
                                    :
                                    null
                            }
                        </Col>
                        <Col>
                            <Tabs size='md' colorScheme='#231953'>
                                <>
                                    <TabList>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Personal Data</Tab>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Addresses</Tab>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Change password</Tab>
                                    </TabList>
                                    <TabPanels align='start'>
                                        <TabPanel>
                                            <FormGroup >
                                                <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Full name</Label>
                                                <InputGroup>
                                                    {
                                                        this.state.edit ?
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" defaultValue={this.props.fullname}
                                                                innerRef={(element) => this.inFullname = element} />
                                                            :
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" value={this.props.fullname} />
                                                    }

                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup >
                                                <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Username</Label>
                                                <InputGroup>
                                                    {
                                                        this.state.edit ?
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" id="textusername" defaultValue={this.props.username}
                                                                innerRef={(element) => this.inUsername = element} />
                                                            :
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" value={this.props.username} />
                                                    }

                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup >
                                                <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Gender</Label>
                                                <InputGroup>
                                                    {
                                                        this.state.edit ?
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="select" defaultValue={this.props.gender}
                                                                innerRef={(element) => this.inGender = element}>
                                                                <option value='Male'>Male</option>
                                                                <option value='Female'>Female</option>
                                                            </Input>
                                                            :
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" value={this.props.gender} />
                                                    }
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup >
                                                <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Age</Label>
                                                <InputGroup>
                                                    {
                                                        this.state.edit ?
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="number" id="age" defaultValue={this.props.age}
                                                                innerRef={(element) => this.inAge = element} />
                                                            :
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="number" value={this.props.age} />
                                                    }
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup >
                                                <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Email</Label>
                                                <InputGroup>
                                                    {
                                                        this.state.edit ?
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" id="textemail" defaultValue={this.props.email}
                                                                innerRef={(element) => this.inEmail = element} />
                                                            :
                                                            <Input disabled={!this.state.edit} bsSize='sm' type="text" value={this.props.email} />
                                                    }

                                                </InputGroup>
                                            </FormGroup>
                                            {
                                                this.state.edit ?
                                                    <div>
                                                        <button className='landing1 text-center py-2 mt-4' style={{ width: '20%' }} onClick={this.btSave}>
                                                            <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Save</p>
                                                        </button>
                                                        <button className='landing1 text-center py-2 mt-4' style={{ width: '20%', marginLeft: 10 }} onClick={() => this.setState({ edit: !this.state.edit, images: [] })}>
                                                            <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Cancel</p>
                                                        </button>
                                                    </div>
                                                    :
                                                    <button className='landing1 text-center py-2 mt-4' style={{ width: '20%' }} onClick={() => this.setState({ edit: !this.state.edit })}>
                                                        <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Edit</p>
                                                    </button>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            <button className='NavbarButton text-center py-2' style={{ width: '20%', float: 'right', marginBottom: 20 }} onClick={() => this.setState({ modalAdd: !this.state.modalAdd })}>
                                                <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Add new address</p>
                                            </button>
                                            {this.printAddress()}
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
                        </Col>
                    </Row>

                </div>

            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        imageurl: state.userReducer.imageurl,
        fullname: state.userReducer.fullname,
        gender: state.userReducer.gender,
        age: state.userReducer.age,
        email: state.userReducer.email,
        address: state.userReducer.address
    }
}

export default connect(mapToProps)(ProfileManagement);