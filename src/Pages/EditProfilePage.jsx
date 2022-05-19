import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { FormGroup, Label, InputGroup, Input, InputGroupText, Toast, ToastBody, ToastHeader, Row, Col, Badge } from 'reactstrap';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { API_URL } from '../helper';
import { keepAction } from '../redux/actions/userAction';
import { connect } from 'react-redux';
import { FiEdit, FiTrash2, FiMapPin } from "react-icons/fi";
import AddAddress from '../Components/AddAddress';
import EditAddress from '../Components/EditAddress';
import Swal from 'sweetalert2';
import PasswordStrengthBar from 'react-password-strength-bar';


class ProfileManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassType: "password",
            newPassShow: <MdVisibilityOff style={{ fontSize: 16 }} />,
            edit: false,
            images: [''],
            modalAdd: false,
            modalEdit: false,
            address: {},
            idx: 0,
            newPassword: ''
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

    printPersonalData = () => {
        return (
            <div>
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
                    {
                        this.state.edit ?
                            <div className='d-flex'>
                                <Input disabled={!this.state.edit} bsSize='sm' type="text" defaultValue={this.props.email}
                                    innerRef={(element) => this.inEmail = element} />
                                <button className='landing1 text-center mx-2' style={{ width: '20%' }} onClick={this.btVerify}>
                                    <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Verify</p>
                                </button>
                            </div>
                            :
                            <Input disabled={!this.state.edit} bsSize='sm' type="text" id="textemail" defaultValue={this.props.email} />
                    }
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
            </div>
        )
    }

    printAddress = () => {
        if (this.props.address) {
            return this.props.address.map((value, index) => {
                return (
                    <div>
                        {
                            value.idaddress === this.props.idaddress ?
                                <div className='container py-4 px-5 ' style={{ backgroundColor: '#fdcb6e', border: '2px solid #fdcb6e', borderRadius: 50, marginBottom: 20 }}>
                                    <Row>
                                        <Col xs='9'>
                                            <div className='d-flex'>
                                                <p className='heading3' style={{ fontSize: 16, marginRight: 20 }}>{value.address_label}</p>
                                                <Badge color='success' className='heading4' style={{ fontSize: 12, paddingBottom: -20 }}>Primary</Badge>
                                            </div>
                                            <p className='heading3 m-0' style={{ fontSize: 16 }}>{value.nama_penerima}</p>
                                            <p className='heading4' style={{ fontSize: 16 }}>{value.handphone}</p>
                                            <div className='d-flex'>
                                                <p className='heading4' style={{ fontSize: 20, color: 'gray', marginRight: 10 }}><FiMapPin /></p>
                                                <p className='heading4' style={{ fontSize: 14 }}>{value.address}, {value.city}, {value.province}</p>
                                            </div>
                                        </Col>
                                        <Col className='d-flex justify-content-center align-items-center'>
                                            <span title='Edit' style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => this.setState({ modalEdit: !this.state.modalEdit, address: value, idx: value.idaddress })}><FiEdit /></span>
                                            <span title='Remove Address' className=' mx-2' style={{ fontSize: 20, color: '#E63E54', cursor: 'pointer' }} onClick={() => this.btDeleteAddress(value.idaddress)} ><FiTrash2 /></span>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                <div className='container py-4 px-5 ' style={{ backgroundColor: 'white', border: '2px solid lightgray', borderRadius: 50, marginBottom: 20 }}>
                                    <Row>
                                        <Col xs='8'>
                                            <p className='heading3' style={{ fontSize: 16 }}>{value.address_label}</p>
                                            <p className='heading3 m-0' style={{ fontSize: 16 }}>{value.nama_penerima}</p>
                                            <p className='heading4' style={{ fontSize: 16 }}>{value.handphone}</p>
                                            <div className='d-flex'>
                                                <p className='heading4' style={{ fontSize: 20, color: 'gray', marginRight: 10 }}><FiMapPin /></p>
                                                <p className='heading4' style={{ fontSize: 14 }}>{value.address}, {value.city}, {value.province}</p>
                                            </div>
                                        </Col>
                                        <Col className='d-flex justify-content-center align-items-center' >
                                            <button className='landing1 mx-3 py-2' onClick={() => this.btChooseAddress(value.idaddress)}>Select</button>
                                            <span title='Edit' style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => this.setState({ modalEdit: !this.state.modalEdit, address: value, idx: value.idaddress })}><FiEdit /></span>
                                            <span title='Remove Address' className=' mx-2' style={{ fontSize: 20, color: '#E63E54', cursor: 'pointer' }} onClick={() => this.btDeleteAddress(value.idaddress)} ><FiTrash2 /></span>
                                        </Col>
                                    </Row>
                                </div>
                        }
                    </div>

                )
            })
        }
    }

    printChangePassword = () => {
        return (
            <div>
                <FormGroup className='mb-5' >
                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Old password</Label>
                    <InputGroup>
                        <Input bsSize='sm' type={this.state.newPassType} id="textOldPassword" placeholder="Old password" style={{ borderRight: "0px" }}
                            innerRef={(element) => this.oldPassword = element} />
                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPass}>
                            {this.state.newPassShow}
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <FormGroup >
                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>New password</Label>
                    <InputGroup>
                        <Input bsSize='sm' type={this.state.newPassType} id="textPassword" placeholder="Password" style={{ borderRight: "0px" }}
                            onChange={(event) => this.setState({ newPassword: event.target.value })}
                            innerRef={(element) => this.newPassword = element} />
                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPass}>
                            {this.state.newPassShow}
                        </InputGroupText>
                    </InputGroup>
                    <PasswordStrengthBar className='my-2' password={this.state.newPassword} />
                </FormGroup>
                <FormGroup style={{ marginTop: -30 }} >
                    <Label className='heading4' style={{ fontSize: 12, fontWeight: 800 }}>Re-type new password</Label>
                    <InputGroup>
                        <Input bsSize='sm' type={this.state.newPassType} id="textConfPassword" placeholder="Confirm password" style={{ borderRight: "0px", width: '70%' }}
                            innerRef={(element) => this.newConfPassword = element} />
                        <InputGroupText style={{ cursor: "pointer", backgroundColor: 'white' }} onClick={this.btShowPass}>
                            {this.state.newPassShow}
                        </InputGroupText>
                    </InputGroup>
                </FormGroup>
                <button className='landing1 text-center py-2 mt-4' style={{ width: '20%' }} onClick={this.btSubmit}>
                    <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Submit</p>
                </button>
            </div>
        )
    }

    btVerify = async () => {
        if (this.props.email !== this.inEmail.value) {
            Swal.fire({
                title: 'Do you want to change the email?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#3498db',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-1',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    if (this.inEmail.value.includes('@')) {
                        let token = localStorage.getItem("data")
                        let res = await axios.post(`${API_URL}/users/changeemail`, { email: this.inEmail.value }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        try {
                            if (res.data.success) {
                                Swal.fire({
                                    title: '',
                                    text: 'Please check your email to verify.',
                                    icon: 'warning',
                                    confirmButtonText: 'Ok'
                                })
                                this.newPassword.value = ""
                                this.newConfPassword.value = ""
                                this.props.keepAction()
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: '',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Your email is invalid.',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }
                } else if (result.isDenied) {

                }
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Input new email.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }


    btSubmit = async () => {
        if (this.newConfPassword.value === "" || this.state.newPassword === "") {
            Swal.fire({
                title: '',
                text: 'Please fill all the blank',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else if (this.newConfPassword.value && this.state.newPassword === this.oldPassword.value) {
            Swal.fire({
                title: '',
                text: 'Please use new password',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {
            if (this.newConfPassword.value === this.state.newPassword) {
                Swal.fire({
                    title: 'Do you want to change the password?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    confirmButtonColor: '#3498db',
                    denyButtonText: 'No',
                    customClass: {
                        actions: 'my-actions',
                        confirmButton: 'order-1',
                        denyButton: 'order-3',
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let token = localStorage.getItem("data")
                        let res = await axios.post(`${API_URL}/users/changepassword`, { newPassword: this.newConfPassword.value, oldPassword: this.oldPassword.value }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        try {
                            if (res.data.success) {
                                Swal.fire({
                                    title: 'Yeay!',
                                    text: 'Change password success',
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                })
                                this.newPassword.value = ""
                                this.newConfPassword.value = ""
                                this.props.keepAction()
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Incorrect old password',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })

            } else {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Password does not match',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            }
        }

    }

    handleImages = (e) => {
        this.setState({ images: { name: e.target.files[0].name, file: e.target.files[0] } })
    }

    btSave = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
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
                    Swal.fire({
                        title: 'Yeay!',
                        text: 'Edit success',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    this.props.keepAction()
                }).catch(err => {
                    console.log(err)
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    btDeleteAddress = (index) => {
        if (index == this.props.idaddress) {
            Swal.fire({
                title: 'Error!',
                text: 'Cannot delete primary address',
                icon: 'error',
                confirmButtonText: 'Ok',
                width: '24rem'
            })
        } else {
            Swal.fire({
                title: 'Do you want to delete selected address?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-1',
                    denyButton: 'order-2',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Deleted', '', 'success')
                    let token = localStorage.getItem("data")
                    axios.delete(`${API_URL}/users/${index}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(res => {
                        console.log(res.data)
                        this.props.keepAction()
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }

    btChooseAddress = (id) => {
        let token = localStorage.getItem("data");
        axios.patch(`${API_URL}/users/chooseaddress`, { idaddress: id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(async (res) => {
            await Swal.fire({
                title: 'Yeay!',
                text: 'Choose address success',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            this.props.keepAction()
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='container-fluid pb-5' style={{ backgroundColor: '#FCFBFA', height: '93vh', paddingTop: 30 }} >
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
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 50, paddingBottom: 30 }}>
                    <p className='heading2 pb-2' style={{ paddingLeft: 30 }}>Profile Management</p>
                    <Row>
                        <Col xs='4'>
                            {
                                this.props.status.includes('Active') ?
                                    <div style={{ marginLeft: 30 }}>
                                        <Badge className='heading4' style={{ fontSize: 16, color: 'white' }} color='success'>{this.props.status}</Badge>
                                    </div>
                                    :
                                    <div style={{ marginLeft: 30 }}>
                                        <Badge className='heading4' style={{ fontSize: 16, color: 'white' }} color='secondary'>{this.props.status}</Badge>
                                        <p className='heading4 text-muted' style={{ fontSize: 12 }}>Please kindly check your email to verify.</p>
                                    </div>
                            }
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
                                    </div>
                                    :
                                    null
                            }
                        </Col>
                        <Col>
                            <Tabs size='md' colorScheme='#231953'>
                                <>
                                    <TabList>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>Personal Data</Tab>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>Addresses</Tab>
                                        <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>Change password</Tab>
                                    </TabList>
                                    <TabPanels align='start'>
                                        <TabPanel>
                                            {this.printPersonalData()}
                                        </TabPanel>
                                        <TabPanel>
                                            <button className='NavbarButton text-center py-2' style={{ width: '20%', float: 'right', marginBottom: 20 }} onClick={() => this.setState({ modalAdd: !this.state.modalAdd })}>
                                                <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Add new address</p>
                                            </button>
                                            {
                                                this.props.address.length > 0 ?
                                                    <div style={{ marginTop: 70, height: '53vh', paddingRight: 20 }} className='scrollbar'>
                                                        {this.printAddress()}
                                                    </div>
                                                    :
                                                    <div className='heading4' style={{ marginTop: 70, height: '53vh', paddingRight: 20, textAlign: 'center' }}>
                                                        No address lists, please add new address.
                                                    </div>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {this.printChangePassword()}
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
        idaddress: state.userReducer.idaddress,
        username: state.userReducer.username,
        password: state.userReducer.password,
        imageurl: state.userReducer.imageurl,
        fullname: state.userReducer.fullname,
        gender: state.userReducer.gender,
        age: state.userReducer.age,
        email: state.userReducer.email,
        address: state.userReducer.address,
        status: state.userReducer.status
    }
}

export default connect(mapToProps, { keepAction })(ProfileManagement);