import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { Modal, ModalBody, Col, Row, Button } from 'reactstrap';
import { API_URL } from '../helper';
import Swal from 'sweetalert2';
import { FiMapPin } from "react-icons/fi";


class ModalDetailTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    handleImages = (e) => {
        this.setState({ images: { name: e.target.files[0].name, file: e.target.files[0] } })
    }

    totalPayment = () => {
        let total = 0
        this.props.detailTransaction.forEach(value => total += value.qty * value.harga)
        return total
    }

    date = () => {
        let date = this.props.transaction.date
        let newDate = moment(date).format("LLL")
        return newDate
    }

    btSubmit = () => {
        let formData = new FormData()
        let data = {
            idtransaction: this.props.transaction.idtransaction
        }
        formData.append('Images', this.state.images.file)
        formData.append('data', JSON.stringify(data));
        let token = localStorage.getItem('data')
        if (token) {
            axios.patch(`${API_URL}/transactions/uploadpayment`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Upload success',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
        }
    }

    printDetail = () => {
        return this.props.detailTransaction.map((value) => {
            return (
                <div className='m-2'>
                    <Row>
                        <Col xs='4'>
                            <img src={API_URL + value.url} style={{ width: '80%' }} alt="" />
                        </Col>
                        <Col className='d-flex flex-column justify-content-center' style={{ marginLeft: -20 }}>
                            <p className='heading4' style={{ fontSize: 14 }}>{value.nama}</p>
                            <p className='heading4' style={{ fontSize: 14 }}>{value.qty} {value.satuan} x Rp. {value.harga.toLocaleString()}</p>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    render() {
        console.log('ini transaction', this.props.transaction)
        return (
            <div>
                <Modal size='lg' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                    <div className='container px-2' >
                        <ModalBody className='px-4 py-5'>
                            <p className='heading2 text-center pb-2' style={{ fontSize: 24 }}>Detail Transaction</p>
                            <hr className='my-3' />
                            <Row >
                                <Col xs='8' style={{ borderRight: '1px solid lightgray', height: '60vh', marginRight: 10 }} className='scrollbar'>
                                    <div className='mx-3 my-2'>
                                        <Row>
                                            <Col>
                                                <p className='heading4 text-muted' style={{ fontSize: 14 }}>No. Invoice</p>
                                            </Col>
                                            <Col>
                                                <p className='heading4 text-muted' style={{ fontSize: 14, textAlign: 'right' }}>{this.props.transaction.invoice}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className='heading4 text-muted' style={{ fontSize: 14 }}>Date</p>
                                            </Col>
                                            <Col>
                                                <p className='heading4 text-muted' style={{ fontSize: 14, textAlign: 'right' }}>{this.date()}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className='my-3' />
                                    <div className='mx-3'>
                                        <p className='heading3 m-0' style={{ fontSize: 18 }}>
                                            Products
                                        </p>
                                    </div>
                                    {this.printDetail()}
                                    <hr className='my-3' />
                                    <div className='mx-3'>
                                        <p className='heading3' style={{ fontSize: 18 }}>
                                            Address info
                                        </p>
                                        <div className='' style={{ backgroundColor: 'white', }}>
                                            <p className='heading3' style={{ fontSize: 16 }}>{this.props.transaction.address_label}</p>
                                            <p className='heading3 m-0' style={{ fontSize: 16 }}>{this.props.transaction.nama_penerima}</p>
                                            <p className='heading4' style={{ fontSize: 16 }}>{this.props.transaction.handphone}</p>
                                            <div className='d-flex' style={{ width: '100%' }}>
                                                <p className='heading4' style={{ fontSize: 20, color: 'gray', marginRight: 10 }}><FiMapPin /></p>
                                                <p className='heading4' style={{ fontSize: 14 }}>{this.props.transaction.address}, {this.props.transaction.city}, {this.props.transaction.province}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='my-3' />
                                    <div className='px-3'>
                                        <div className='heading3' style={{ fontSize: 18 }}>
                                            Payment detail
                                        </div>
                                        {
                                            this.props.transaction.total_price ?
                                                <div>
                                                    <Row>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14 }}>Total</p>
                                                        </Col>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14, textAlign: 'right' }}>Rp. {this.props.transaction.total_price.toLocaleString()}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14 }}>Shipping</p>
                                                        </Col>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14, textAlign: 'right' }}>Rp. {this.props.transaction.shipping.toLocaleString()}</p>
                                                        </Col>
                                                    </Row>
                                                    <hr className='my-2' />
                                                    <Row>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14, fontWeight: '900' }}>Total Payment</p>
                                                        </Col>
                                                        <Col>
                                                            <p className='heading4' style={{ fontSize: 14, fontWeight: '900', textAlign: 'right' }}>Rp. {this.props.transaction.total_payment.toLocaleString()}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </Col>
                                <Col>
                                    <div className='d-flex align-items-center'>
                                        {
                                            this.props.transaction.payment_url ?
                                                <div className='file-inputs' style={{ width: '90%', fontSize: 12 }}>
                                                    <input type='file' value='' onChange={(e) => this.handleImages(e)} />
                                                    <button className='landing1'>
                                                        Change payment receipt
                                                    </button>
                                                </div> :
                                                this.state.images ?
                                                    <div className='file-inputs' style={{ width: '90%', fontSize: 12 }}>
                                                        <input type='file' value='' onChange={(e) => this.handleImages(e)} />
                                                        <button>
                                                            Upload payment receipt
                                                        </button>
                                                    </div>
                                                    :
                                                    <div className='file-inputs' style={{ width: '90%', fontSize: 12 }}>
                                                        <input type='file' value='' onChange={(e) => this.handleImages(e)} />
                                                        <button>
                                                            Upload payment receipt
                                                        </button>
                                                    </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            this.props.transaction.payment_url ?
                                                <div>
                                                    <img src={API_URL + this.props.transaction.payment_url} style={{ width: '70%' }} />
                                                </div> :
                                                this.state.images.file ?
                                                    <div>
                                                        <img src={URL.createObjectURL(this.state.images.file)} style={{ width: '70%' }} />
                                                        <div className='d-flex my-3'>
                                                            <Button divor="success" style={{ fontSize: 12, marginRight: 10 }} onClick={this.btSubmit} >Submit</Button>
                                                            <Button color="danger" style={{ fontSize: 12 }} onClick={() => this.setState({ images: [] })} >Cancel</Button>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalDetailTransaction;