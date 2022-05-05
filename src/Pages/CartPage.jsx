import React from 'react';
import { connect } from 'react-redux';
import { deleteCartActions, getCartAction, getProductAction, updateQtyActions } from '../redux/actions';
import { Badge, Button, Input, Row, Col } from 'reactstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai'
import cartmedicine from '../img/cartmedicine.png'
import { FiEdit, FiMapPin, FiTrash2 } from "react-icons/fi";
import { API_URL } from '../helper';
import { IoRemoveCircleOutline, IoAddCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsCart4 } from "react-icons/bs";
import Swal from 'sweetalert2';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
        }
    }
    componentDidMount() {
        this.props.getCartAction()
    }
    btnCheckout = () => {
        const d = new Date()
        axios.post(`${API_URL}/transactions/checkout`, {
            idaddress: this.props.idaddress,
            invoice: `INV/${d.getTime()}`,
            date: moment().format('YYYY-MM-DD'),
            // date: d.toISOString().slice(0,19).replace('T',' '),
            total_price: this.totalPrice(),
            shipping: this.shipping(),
            total_payment: this.totalPayment(),
            notes: 'Waiting for payment',
            detail: this.props.carts,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        })
            .then((res) => {
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Checkout Success.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.props.getCartAction()
            })
    }
    btnIncrement = (index) => {
        let temp = [...this.props.carts]
        if (temp[index].qty < temp[index].stock_qty) {
            temp[index].qty += 1
        }
        this.props.updateQtyActions(temp[index].idcart, temp[index].qty)
    }
    btnDecrement = (index) => {
        let temp = [...this.props.carts];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
            temp[index].total_harga -= this.props.carts[index].harga
            this.props.updateQtyActions(temp[index].idcart, temp[index].qty)
        } else {
            this.props.deleteCartActions(temp[index].idcart)
        }
    }
    btnRemove = (index) => {
        let temp = [...this.props.carts]
        this.props.deleteCartActions(temp[index].idcart)
    }
    printCart = () => {
        return this.props.carts.map((value, index) => {
            return (
                <div className='row p-3' style={{ height: '20vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: 20, marginBottom: '23px', background: 'white' }}>
                    <div className='col-3' style={{ width: '30%' }}>
                        <img src={API_URL + value.url} style={{ width: '70%' }} alt="" />
                    </div>
                    <div className='col-5 py-4' style={{ marginLeft: -30 }}>
                        <p className='heading3' style={{ fontSize: 24 }}>{value.nama}</p>
                        <p>Category: {value.category}</p>
                    </div>
                    <div className='col-3' style={{ marginLeft: 30 }}>
                        <div>
                            <p className='heading3' style={{ marginTop: 23, fontSize: 24 }}>Rp.{value.total_harga.toLocaleString()}</p>
                            <p style={{ marginTop: -10 }}>{value.berat}{value.satuan}</p>
                        </div>
                        <div className="d-flex" style={{ marginTop: 20 }}>
                            <IoRemoveCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F' }} onClick={() => this.btnDecrement(index)} />
                            <Input style={{ width: 45, border: 'none', textAlign: 'center' }} value={value.qty}></Input>
                            <IoAddCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F' }} onClick={() => this.btnIncrement(index)} />
                            <span onClick={() => this.btnRemove(index)} title='Remove Product' style={{ fontSize: 29, color: '#E63E54', marginTop: 5, marginLeft: 15 }}><FiTrash2 /></span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    printAddress = () => {
        if (this.props.address) {
            return this.props.address.map((value, index) => {
                if (value.idaddress == this.props.idaddress) {
                    return (
                        <div className='d-flex heading4 justify-content-between' style={{ backgroundColor: 'white' }}>
                            <div className='' style={{ backgroundColor: 'white', }}>
                                <p className='heading3' style={{ fontSize: 16 }}>{value.address_label}</p>
                                <p className='heading3 m-0' style={{ fontSize: 16 }}>{value.nama_penerima}</p>
                                <p className='heading4' style={{ fontSize: 16 }}>{value.handphone}</p>
                                <div className='d-flex' style={{ width: '100%' }}>
                                    <p className='heading4' style={{ fontSize: 20, color: 'gray', marginRight: 10 }}><FiMapPin /></p>
                                    <p className='heading4' style={{ fontSize: 14 }}>{value.address}, {value.city}, {value.province}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }
    }
    totalPrice = () => {
        let total = 0
        this.props.carts.forEach((value) => total += value.qty * value.harga)
        return total
    }
    shipping = () => {
        let total = 0;
        this.props.carts.forEach((value) => total += (value.qty * value.harga) * 20 / 100)
        return total
    }
    totalPayment = () => {
        let total = 0;
        this.props.carts.forEach((value) => total += value.qty * value.harga)
        return total + this.shipping()
    }
    render() {
        return (
            <div className='container-fluid' style={{ background: '#FCFBFA' }}>

                <div className='container p-4'>
                    <div style={{ backgroundPosition: '20% 30%', backgroundSize: 'cover', backgroundImage: `url('${cartmedicine}')`, backgroundRepeat: 'no-repeat', width: '100%', height: '32vh', borderRadius: '15px' }}>
                        <div style={{ paddingTop: '11vh', paddingLeft: '860px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Carts</h1>
                        </div>
                    </div>
                    {
                        this.props.carts.length > 0 ?
                            <div className='row'>
                                <div className='col-8 p-4'>
                                    {this.printCart()}
                                </div>
                                <div className='col-4 py-4'>
                                    <div style={{ borderRadius: 20, background: 'white', height: 'auto', width: 340, marginLeft: 'auto', padding: 23, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', marginBottom: '20px' }}>
                                        <div style={{ height: 'auto' }}>
                                            <p className='heading3' style={{ fontSize: '' }}>ADDRESS</p>
                                        </div>
                                        <div style={{ height: 'auto' }}>
                                            {
                                                this.props.address.length > 0 ?
                                                    <div>
                                                        {this.printAddress()}
                                                        <div style={{ paddingBottom: 20 }}>
                                                            <Link to='/edit'>
                                                                <p style={{ float: 'right', color: '#1E144F', fontWeight: 'bold', cursor: 'pointer' }} className='heading4'>Change Address</p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        <div style={{ height: 'auto', textAlign: 'center', color: 'red', fontSize: 17 }}>
                                                            <p>YOU HAVE TO ADD YOUR ADDRESS</p>
                                                        </div>
                                                        <div style={{ paddingBottom: 20, paddingTop: 10 }}>
                                                            <Link to='/edit'>
                                                                <p style={{ float: 'right', color: '#1E144F', fontWeight: 'bold', cursor: 'pointer' }} className='heading4'>Add Address</p>
                                                            </Link>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    <div style={{ borderRadius: 20, background: 'white', height: 400, width: 340, marginLeft: 'auto', padding: 23, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                        <div>
                                            <p className='heading3' style={{ fontSize: '' }}>ORDER SUMMARY</p>
                                        </div>
                                        <div style={{ height: '26vh' }}>
                                            <div className='d-flex'>
                                                <p className='heading3' style={{ fontSize: 20 }}>Cart Total :</p>
                                                <p className='heading3' style={{fontSize:20,marginLeft:6}}>{this.props.carts.length > 0 ? this.props.carts.length : null}</p>
                                            </div>
                                            <div style={{ marginTop: 40 }}>
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Total Price</p>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Rp. {this.totalPrice().toLocaleString()}</p>
                                                </div>
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Shipping</p>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Rp. {this.shipping().toLocaleString()}</p>
                                                </div>
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Total Payment</p>
                                                    <p className='heading3' style={{ fontSize: 18 }}>Rp. {this.totalPayment().toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button onClick={this.btnCheckout} style={{ width: 200, height: 50, border: 'none' }} className='NavbarButton'>CHECKOUT</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ marginTop: 50, marginBottom: 50, width: '70%', height: '40vh' }} className="container text-center ">
                                <p className='heading1' style={{ paddingTop: '50px' }}>Your Cart Is Empty</p>
                                <p className='heading3'>Buy some products by click this button below</p>
                                <Link to="/products">
                                    <Button style={{ marginTop: 40, backgroundColor: '#E63E54', width: '20%', height: '15%', border: 'none', fontSize: 20, fontFamily: "Nunito, sans-serif" }}>Buy</Button>
                                </Link>
                            </div>
                    }
                </div>

            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        carts: state.transactionsReducer.carts,
        idaddress: state.userReducer.idaddress,
        address: state.userReducer.address
    }
}
export default connect(mapToProps, { getCartAction, deleteCartActions, updateQtyActions, getProductAction })(CartPage)