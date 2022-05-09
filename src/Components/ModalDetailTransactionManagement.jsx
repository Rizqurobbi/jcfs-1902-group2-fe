import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { Modal, ModalBody, Row, Col, Button } from 'reactstrap'
import { API_URL } from '../helper';
import { FiMapPin } from "react-icons/fi";
import Swal from 'sweetalert2';

class ModalDetailTransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    totalPayment = () => {
        let total = 0
        this.props.detailTransaction.forEach(value => total += value.qty * value.harga)
        return total
    }

    printDetail = () => {
        return this.props.detailTransaction.map((value) => {
            return (
                <div className='m-4'>
                    <Row>
                        <Col xs='4'>
                            <img src={API_URL + value.url} style={{ width: '100%' }} alt="" />
                        </Col>
                        <Col>
                            <p className='heading4' style={{ fontSize: 16 }}>{value.nama}</p>
                            <p className='heading4' style={{ fontSize: 16 }}>{value.qty} x Rp. {value.harga.toLocaleString()}</p>
                        </Col>
                    </Row>
                </div>
            )
        })
    }

    btConfirm = () => {
        axios.post(`${API_URL}/transactions/confirmtransaction`, {
            idtransaction: this.props.transaction.idtransaction,
            date: moment().format('YYYY-MM-DD'),
            detail: this.props.detailTransaction,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        })
            .then((res) => {
                axios.post(`${API_URL}/transactions/insertrevenue`, {
                    date: moment().format('YYYY-MM-DD'),
                    detail: this.props.detailTransaction,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('data')}`
                    }
                })
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Checkout Success.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.props.btClose()
                window.location.reload();
            })
    }
    btReject = () => {
        axios.patch(`${API_URL}/transactions/rejecttransaction`, {
            idtransaction: this.props.transaction.idtransaction
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        })
            .then((res) => {
                Swal.fire({
                    text: 'Reject transaction Success.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                this.props.btClose()
                window.location.reload();
            })
    }



    render() {
        console.log('inipropstransaction', this.props.transaction)
        console.log('inidetailtransaksi', this.props.detailTransaction)
        return (
            <div>
                {
                    this.props.detailTransaction.length > 0 &&
                    <Modal size='lg' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                        <div className='container px-2' >
                            <ModalBody className='px-5 pt-5'>
                                <p className='heading2 text-center' style={{ fontSize: 24 }}>Detail Transaction</p>
                                <hr className='my-4' />
                                <Row >
                                    <Col xs='8' style={{ borderRight: '1px solid lightgray', height: '40vh', marginRight: 20 }} className='scrollbar'>
                                        {this.printDetail()}
                                    </Col>
                                    <Col>
                                        <div className='heading3 py-4' style={{ fontSize: 20 }}>
                                            Payment detail
                                        </div>
                                        <Row>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16 }}>Total</p>
                                            </Col>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16 }}>Rp. {this.props.transaction.total_price.toLocaleString()}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16 }}>Shipping</p>
                                            </Col>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16 }}>Rp. {this.props.transaction.shipping.toLocaleString()}</p>
                                            </Col>
                                        </Row>
                                        <hr className='my-3' />
                                        <Row>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16 }}>Total Payment</p>
                                            </Col>
                                            <Col>
                                                <p className='heading4' style={{ fontSize: 16, fontWeight: 'bold' }}>Rp. {this.props.transaction.total_payment.toLocaleString()}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr className='my-3' />
                                <div className='mx-3'>
                                    <p className='heading3' style={{ fontSize: 20 }}>
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
                                <p className='heading3 mx-3'>
                                    Receipt of payment
                                </p>
                                {
                                    this.props.transaction.payment_url ?
                                        <div style={{ width: '65%' }}>
                                            <img src={API_URL + this.props.transaction.payment_url} style={{ width: '100%' }} />
                                            <div className='d-flex my-3'>
                                                <Button divor="success" style={{ fontSize: 12, marginRight: 10 }} onClick={this.btConfirm} >Confirm</Button>
                                                <Button color="danger" style={{ fontSize: 12 }} onClick={this.btReject} >Reject</Button>
                                            </div>
                                        </div>
                                        :
                                        <div className='mx-3'>
                                            <p className='heading4'>User not yet upload payment receipt</p>
                                        </div>
                                }
                            </ModalBody>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}

export default ModalDetailTransactionManagement;