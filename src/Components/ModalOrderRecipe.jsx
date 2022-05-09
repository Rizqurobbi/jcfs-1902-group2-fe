import React, { Component } from 'react';
import { Modal, ModalBody, FormGroup, InputGroup, Input, Row, Col, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';
import { connect } from 'react-redux';
import { FiTrash2, FiEdit, FiCheck, FiMapPin } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

class ModalAddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddProduct: [],
            detailProduct: {},
            selectedIdx: null,
            inProduct: 0,
            inUnit: null,
            cost: {}
        }
    }

    componentDidMount() {
        this.props.getProductAction()
    }

    onBtAddProduct = (index) => {
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
        if (this.state.inProduct === 0 || this.inUnit.value === "" || this.inQty.value === 0) {
            Toast.fire({
                icon: 'warning',
                text: 'Fill all the blank.',
                title: 'Warning'
            })
        } else {
            axios.get(`${API_URL}/products?idproduct=${this.state.inProduct}`)
                .then((response) => {
                    this.setState({ detail: response.data.dataProducts[0] })
                    let dataProduct = {
                        idtransaction: this.props.detailRecipe.iduser,
                        idproduct: this.state.inProduct,
                        idunit: this.state.inUnit,
                        idstock: this.state.detail.stocks[1].idstock,
                        url: this.state.detail.images[0].url,
                        nama: this.state.detail.nama,
                        total_harga: Math.round((this.state.detail.harga / this.state.detail.stocks[1].qty) * this.inQty.value),
                        unit: this.inUnit.value,
                        qty: parseInt(this.inQty.value),
                        date: moment().format('YYYY-MM-DD')
                    }
                    let temp = [...this.state.AddProduct]
                    let { AddProduct } = this.state
                    let checkIdx = AddProduct.findIndex(val => val.idproduct == this.inProduct.value)
                    if (checkIdx >= 0) {
                        //update qty
                        AddProduct[checkIdx].qty += dataProduct.qty
                        AddProduct[checkIdx].total_harga += dataProduct.total_harga
                    } else {
                        //add to cart
                        temp.push(dataProduct)
                    }
                    this.setState({
                        AddProduct: temp
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtSave = (index) => {
        let { AddProduct } = this.state
        AddProduct[index].qty = this.inEditQty.value
        AddProduct[index].total_harga = (this.state.detail.harga / this.state.detail.stocks[1].qty) * this.inEditQty.value
        this.setState({
            edit: !this.state.edit
        })
    }

    printCart = () => {
        return this.state.AddProduct.map((value, index) => {
            return (
                <div className='row d-flex align-items-center' style={{ borderRadius: 15, marginBottom: '20px', background: 'white' }}>
                    <div className='col-4' style={{ width: '30%' }}>
                        <img src={API_URL + value.url} style={{ width: '100%' }} alt="" />
                    </div>
                    <div className='col-3 d-flex align-items-center' >
                        <div>
                            <p className='heading4' style={{ fontSize: 16 }}>{value.nama}</p>
                            <div className='d-flex'>
                                {
                                    this.state.selectedIdx == index ?
                                        <Input style={{ marginRight: '5px' }} type="number" placeholder={`Qty`} innerRef={(element) => this.inEditQty = element} />
                                        :
                                        <p className='heading4' style={{ fontSize: 16 }}>{value.qty}</p>
                                }
                                <p className='heading4' style={{ fontSize: 16 }}>{value.unit}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <p style={{ width: 45, border: 'none', textAlign: 'center' }} value={value.qty}></p>
                        <p className='heading3' style={{ fontSize: 16 }}>Rp.{value.total_harga.toLocaleString()}</p>
                    </div>
                    <div className='col-2 d-flex align-items-center'>
                        {
                            this.state.selectedIdx == index ?
                                <span title='Save' className='my-2' style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => this.onBtSave(index, this.setState({ selectedIdx: null }))}><FiCheck /></span>
                                :
                                <span title='Edit' className='my-2' style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => this.setState({ selectedIdx: index })}><FiEdit /></span>
                        }
                        <span onClick={() => this.btnRemove(index)} title='Remove Product' style={{ fontSize: 29, color: '#E63E54', marginLeft: 15, cursor: 'pointer' }}><FiTrash2 /></span>
                    </div>
                </div>
            )
        })
    }

    totalPrice = () => {
        let total = 0
        this.state.AddProduct.forEach((value) => total += value.total_harga)
        return total
    }

    shipping = () => {
        let total = 0;
        this.state.AddProduct.forEach((value) => total += (value.total_harga) * 20 / 100)
        return Math.round(total)
    }

    totalPayment = () => {
        let total = 0;
        this.state.AddProduct.forEach((value) => total += value.total_harga)
        return Math.round(total + this.shipping())
    }

    onBtCheckout = () => {
        let dataCheckout = {
            iduser: this.props.detailRecipe.iduser,
            idaddress: this.props.detailRecipe.idaddress,
            invoice: this.props.detailRecipe.invoice,
            date: this.props.detailRecipe.date,
            total_price: this.totalPrice(),
            shipping: this.shipping(),
            total_payment: this.totalPayment(),
            notes: 'Recipe has been processed',
            detail: this.state.AddProduct,
        }
        console.log('datachekcout', dataCheckout)
        axios.post(`${API_URL}/transactions/checkoutrecipe`, dataCheckout, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('data')}`
            }
        }).then((res) => {
            if (res.data.success) {
                let dataOutRecipe = {
                    detail: this.state.AddProduct
                }
                axios.post(`${API_URL}/products/outstockrecipe`, dataOutRecipe)
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Checkout success',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.editStatusTransactions()
                this.setState({
                    AddProduct: []
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    editStatusTransactions = () => {
        axios.patch(`${API_URL}/transactions/editstatusrecipe`, { idresep: this.props.detailRecipe.idresep })
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }

    btnRemove = (index) => {
        let temp = [...this.state.AddProduct]
        temp.splice(index, 1)
        this.setState({
            AddProduct: temp
        })
    }

    onBtClose = () => {
        this.setState({
            AddProduct: []
        })
        this.props.btClose()
    }

    selectCourier = async (event) => {
        let data = {
            origin: 457,
            destination: this.props.detailRecipe.idcity,
            weight: 1000,
            courier: event.target.value
        }
        try {
            let token = localStorage.getItem('data')
            let res = await axios.post(`${API_URL}/api/ongkir`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.success) {
               this.setState({
                   cost: res.data
               })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onRenderInputUnit = (product) => {
        for (let i = 0; i < product.length; i++) {
            if (this.state.inProduct == this.props.products[i].idproduct) {
                return (
                    <option value={this.props.products[i].stocks[1].satuan}>{this.props.products[i].stocks[1].satuan}</option>
                )
            }
        }
    }

    render() {
        console.log('ini produk', this.props.products)
        console.log('ini recipe detail', this.props.detailRecipe)
        console.log('ini cost', this.state.cost)
        return (
            <div>
                <Modal size='xl' isOpen={this.props.modalOpen} toggle={this.onBtClose} centered >
                    <div className='container' style={{ backgroundColor: '#FCFBFA' }} >
                        <ModalBody className='px-2 py-5'>
                            <p className='heading2 m-0 pb-5 text-center' style={{ fontSize: 32 }}>Arrange user's order</p>
                            <Row>
                                <Col className='px-3'>
                                    <p className='heading2 my-2' style={{ fontSize: 20 }}>Picture</p>
                                    <hr className='my-2' />
                                    <img src={API_URL + this.props.detailRecipe.url} width="100%" className='m-auto' />
                                    <p className='heading2 my-2' style={{ fontSize: 20 }}>Address Detail</p>
                                    <hr className='my-2' />
                                    <div className='p-4' style={{ border: '1px solid lightgray' }}>
                                        <div className='d-flex'>
                                            <p className='heading3' style={{ fontSize: 14, marginRight: 20 }}>{this.props.detailRecipe.address_label}</p>
                                        </div>
                                        <p className='heading3 m-0' style={{ fontSize: 16 }}>{this.props.detailRecipe.nama_penerima}</p>
                                        <p className='heading4' style={{ fontSize: 16 }}>{this.props.detailRecipe.handphone}</p>
                                        <div className='d-flex'>
                                            <p className='heading4' style={{ fontSize: 20, color: 'gray', marginRight: 10 }}><FiMapPin /></p>
                                            <p className='heading4' style={{ fontSize: 14 }}>{this.props.detailRecipe.address}, {this.props.detailRecipe.city}, {this.props.detailRecipe.province}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='d-flex'>
                                        <FormGroup>
                                            <Label>Product</Label>
                                            <div className='d-flex'>
                                                <Input type='select' id='selectProduct'
                                                    onClick={() => this.setState(
                                                        { inProduct: this.inProduct.value })}
                                                    innerRef={(element) => this.inProduct = element}>
                                                    <option value={0}>Choose product...</option>
                                                    {
                                                        this.props.products.map((val) => <option value={val.idproduct} key={val.idproduct}>{val.nama}</option>)
                                                    }
                                                </Input>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Stocks</Label>
                                            <div className='d-flex'>
                                                <Input style={{ marginRight: '5px' }} type="number" placeholder={`Qty`} innerRef={(element) => this.inQty = element} />
                                                {
                                                    this.state.inProduct ?
                                                        <Input type='select'
                                                            onClick={() => this.setState({ inUnit: this.inUnit.value })}
                                                            innerRef={(element) => this.inUnit = element}>
                                                            {this.onRenderInputUnit(this.props.products)}
                                                        </Input>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </FormGroup>
                                        <div className='mt-4' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer', width: "20%" }} onClick={this.onBtAddProduct}>
                                            <button className='mt-2' style={{ fontSize: 32 }} ><IoAddCircleOutline /></button>
                                        </div>
                                    </div>
                                    <p className='heading2 m-0' style={{ fontSize: 20 }}>Carts</p>
                                    <div className='container pt-3 scrollbar' style={{ backgroundColor: '#FCFBFA', maxHeight: '40vh' }} >
                                        {this.state.AddProduct.length > 0 ?
                                            this.printCart()
                                            : null
                                        }
                                    </div>
                                    {
                                        this.state.AddProduct.length > 0 ?
                                            <div className='my-3'>
                                                <Row>
                                                    <Col xs='3'>
                                                        <p className='heading2 m-0' style={{ fontSize: 20 }}>Total</p>
                                                        <p className='heading4'>Rp. {this.totalPrice().toLocaleString()}</p>
                                                    </Col>
                                                    <Col xs='4'>
                                                        <p className='heading2 m-0' style={{ fontSize: 20 }}>Shipping</p>
                                                        <p className='heading4'>Rp. {this.shipping().toLocaleString()}</p>
                                                    </Col>
                                                    <Col xs='5'>
                                                        <p className='heading2 m-0' style={{ fontSize: 20 }}>Total Payment</p>
                                                        <p className='heading4'>Rp. {this.totalPayment().toLocaleString()}</p>
                                                    </Col>
                                                </Row>
                                                <div className='NavbarButton my-2' style={{ width: '20%' }}>
                                                    <button className='heading4 py-2 m-0 text-center' style={{ fontWeight: 700, color: 'white' }} onClick={this.onBtCheckout}>Checkout</button>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                </Col>
                            </Row>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        unit: state.productsReducer.unit,
        products: state.productsReducer.products
    }
}

export default connect(mapToProps, { getProductAction })(ModalAddRecipe);