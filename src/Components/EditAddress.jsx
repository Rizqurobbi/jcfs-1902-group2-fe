import React, { Component } from 'react';
import { FormGroup, Modal, ModalBody, Input, InputGroup, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';
import axios from 'axios';
import Swal from 'sweetalert2';
import { keepAction } from '../redux/actions/userAction';
import { connect } from 'react-redux';

class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            province: [],
            city: [],
            idprovince: 0
        }
    }

    componentDidMount() {
        this.getProvince()
    }

    btSubmit = () => {
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
        if (this.inAddressLabel.value === "" || this.inName.value === "" || this.inPhone.value === "" || this.inCity.value === "" || this.inAddressDetail.value === "") {
            Toast.fire({
                icon: 'warning',
                text: 'Fill all the blank.',
                title: 'Warning'
            })
        } else {
            let data = {
                idaddress: this.props.address.idaddress,
                address_label: this.inAddressLabel.value,
                name: this.inName.value,
                handphone: this.inPhone.value,
                idprovince: this.state.idprovince,
                idcity: this.inCity.value,
                address: this.inAddressDetail.value
            }
            let token = localStorage.getItem("data")
            axios.patch(`${API_URL}/users/editaddress`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Change address success',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    width: '24rem'
                })
                this.setState({
                    city: []
                })
                this.props.btClose()
                this.props.keepAction()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    getProvince = () => {
        axios.get(`${API_URL}/api/provinsi`)
            .then(res => {
                this.setState({
                    province: res.data.dataProvinsi.rajaongkir.results
                })
            }).catch(err => {
                console.log(err)
            })
    }

    printGetProvince = () => {
        return this.state.province.map((item, index) => {
            return (
                <option key={index} value={item.province_id}>{item.province}</option>
            )
        })
    }

    handleCity = async (event) => {
        let res = await axios.get(`${API_URL}/api/city/${event.target.value}`)
        if (res.data.success) {
            this.setState({
                city: res.data.dataCity,
                idprovince: event.target.value
            })
        }
    }

    printGetCity = () => {
        return this.state.city.map((item, index) => {
            return (
                <option key={index} value={item.city_id}>{item.city_name}</option>
            )
        })
    }

    render() {
        return (
            <div>
                <Modal size='md' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                    <div className='container px-5' style={{ backgroundColor: '#FCFBFA' }} >
                        <ModalBody className='px-5 py-5'>
                            <p className='heading2 m-0 text-center' style={{ fontSize: 24 }}>Edit address</p>
                            <p className='heading4 pb-4 text-muted text-center' style={{ fontSize: 12 }}>Edit your address below</p>
                            <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>Address Label</p>
                                <InputGroup>
                                    <Input size='sm' type="text" id="textAddress" placeholder="Your address label" defaultValue={this.props.address.address_label}
                                        innerRef={(element) => this.inAddressLabel = element} />
                                </InputGroup>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                        <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>Recipient's name</p>
                                        <InputGroup>
                                            <Input size='sm' type="text" id="textAddress" placeholder="Name" defaultValue={this.props.address.nama_penerima}
                                                innerRef={(element) => this.inName = element} />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                        <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>No. Handphone</p>
                                        <InputGroup>
                                            <Input size='sm' type="number" id="textAddress" placeholder="Phone" defaultValue={this.props.address.handphone}
                                                innerRef={(element) => this.inPhone = element} />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>Province</p>
                            <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                <InputGroup>
                                    <Input size='sm' type="select" id="selectProvince" placeholder='Choose Province'
                                        onChange={(event) => this.handleCity(event)}>
                                        <option value='' selected="" disabled="" placeholder='Choose Province'>Choose Province...</option>
                                        {this.printGetProvince()}
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>City</p>
                            <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                <InputGroup>
                                    <Input size='sm' type="select" id="selectProvince" placeholder='Choose City'
                                        innerRef={(element) => this.inCity = element}>
                                        <option value='' selected="" disabled="">Choose city...</option>
                                        {this.printGetCity()}
                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className='pb-2' style={{ width: '100%', margin: 'auto' }}>
                                <p className='heading2 m-0 pb-2' style={{ fontSize: 16 }}>Detail Address</p>
                                <InputGroup>
                                    <Input size='sm' style={{ width: '200%' }} type="textarea" id="textAddress" placeholder="" defaultValue={this.props.address.address}
                                        innerRef={(element) => this.inAddressDetail = element} />
                                </InputGroup>
                            </FormGroup>
                            <div className='NavbarButton mt-4' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer', style: "20%" }} onClick={this.btSubmit}>
                                <button className='py-2' >Submit</button>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { keepAction })(EditAddress);