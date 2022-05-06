import React from 'react';
import { Modal, ModalBody , Row, Col } from 'reactstrap'
import { API_URL } from '../helper';
class ModalDetailTransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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

    render() {
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
                                                <p className='heading4' style={{ fontSize: 16 }}>Rp. {this.props.transaction.total_payment.toLocaleString()}</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr className='my-3' />
                                <div className='mx-3'>
                                    <p className='heading3' style={{ fontSize: 20 }}>
                                        Address info
                                    </p>
                                    <p className='heading4' style={{ fontSize: 16 }}>{this.props.transaction.address}</p>
                                </div>
                                <hr className='my-3' />
                                <Row style={{ marginTop: 40 }}>
                                    <Col className='align-self-center'>
                                            <p className='heading3'>
                                            Receipt of payment
                                            </p>
                                    </Col>
                                    <Col>
                                        {
                                            this.props.transaction.payment_url ?
                                                <div style={{width:'65%',margin:'auto'}}>
                                                    <img src={API_URL + this.props.transaction.payment_url} style={{ width: '100%' }} />
                                                </div>
                                                :
                                                null
                                        }
                                    </Col>

                                </Row>



                            </ModalBody>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}

export default ModalDetailTransactionManagement;