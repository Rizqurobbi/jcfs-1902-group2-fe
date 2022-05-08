import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, } from '@chakra-ui/react'
import axios from 'axios';
import { API_URL } from '../helper';
import { Link } from 'react-router-dom';
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { addToCartAction } from '../redux/actions';
import Swal from 'sweetalert2';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            detail: {},
            thumbnail: 0,
            redirect: false
        }
    }
    componentDidMount() {
        this.getProduct()
    }
    getProduct = () => {
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                this.setState({ detail: response.data.dataProducts[0] })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    btnAddToCart = async () => {
        if (this.props.role == 'User') {

            let { detail, counter } = this.state
            let dataCart = {
                idproduct: detail.idproduct,
                idstock: detail.stocks[0].idstock,
                qty: counter,
            }
            if (this.props.username) {
                let res = await this.props.addToCartAction(dataCart)
                if (res.success) {
                    this.setState({ redirect: true })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Stock empty',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            } else {
                Swal.fire({
                    title: 'Warning!',
                    text: 'Please login first',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                })
            }
        } else if (this.props.role == 'Admin') {
            Swal.fire({
                title: 'Warning!',
                text: 'You are an Admin',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {
            Swal.fire({
                title: 'Warning!',
                text: 'Please login first',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
    }
    btnIncrement = (num) => {
        if (this.state.counter < this.state.detail.stocks[0].qty) {
            this.state.counter += num
            this.setState({ coonter: this.state.counter })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Out of stock',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
    btnDecrement = (num) => {
        if (this.state.counter > 1) {

            this.state.counter -= num
            this.setState({
                counter: this.state.counter
            })
        }
    }
    printDetail = () => {
        let { detail } = this.state
        return (
            <div className='row'>
                {console.log(detail.idstock)}
                {detail.idproduct &&
                    <>
                        <div className='col-6' style={{ paddingLeft: 105 }}>
                            <div style={{ width: '80%' }}>
                                <img style={{ borderRadius: 8 }} src={API_URL + detail.images[0].url} width="100%" alt="" />
                            </div>
                        </div>
                        <div className='col-6' style={{ paddingTop: 20 }}>

                            <div style={{ alignItems: 'center' }}>
                                <p style={{ color: '#231953', fontSize: 30 }}>{detail.nama} ({detail.stocks[1].qty}{detail.stocks[1].satuan})</p>
                                <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '30px' }}>Rp. {detail.harga.toLocaleString()}</p>
                                <p style={{ fontWeight: 'bolder', marginTop: '14px' }} className='heading4'>{detail.deskripsi}</p>
                                <p style={{ paddingTop: 15, paddingBottom: 15, fontSize: 15, color: '#231953', fontWeight: 'bold' }}>Available : {detail.stocks[0].qty} {detail.stocks[0].satuan}</p>
                            </div>
                            <div className='row'>
                                <div className="col-6">

                                    <div className='d-flex'>
                                        <IoRemoveCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F', cursor: 'pointer' }} onClick={() => this.btnDecrement(1)} />
                                        <Input textAlign='center' value={this.state.counter} type="number" width='12' style={{ borderRadius: 2.9 }} border='none'></Input>
                                        <IoAddCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F', cursor: 'pointer' }} onClick={() => this.btnIncrement(1)} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <button onClick={this.btnAddToCart} style={{ float: 'right', width: '200px' }} className='landing1 py-2'>Add To Cart</button>
                                </div>
                            </div>

                        </div>
                    </>
                }
            </div>

        )
    }
    render() {
        let { detail } = this.state

        if (this.state.redirect) {
            return <Navigate to='/cart-user' />
        }
        return (
            <div style={{ background: 'white' }}>
                {
                    detail.idproduct &&
                        detail.stocks[0].qty > 0 ?
                        <>
                            <div style={{ backgroundColor: 'white', height: 50 }}>
                                <div style={{ paddingLeft: '20px', paddingTop: '10px' }} className='container'>
                                    <div style={{ display: 'flex' }}>
                                        <p className='mx-2' style={{ color: '#231953', cursor: 'pointer' }}>Home {'>'}</p>
                                        <Link to='/products'>
                                            <p style={{ color: '#231953', cursor: 'pointer' }}>Products {'>'}</p>
                                        </Link>
                                        <p className='mx-2' style={{ color: '#231953', fontWeight: 'bolder', cursor: 'pointer' }}>{detail.nama}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: 100 }} className="container">
                                {this.printDetail()}
                                <p className='heading2' style={{fontSize: 26, marginTop: 80, textAlign: 'center'}}>Information :</p>
                                <Tabs size='md' align='center' colorScheme='#231953' className='my-3'>
                                    {detail.idproduct &&
                                        <>
                                            <TabList>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Serving</Tab>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Dose</Tab>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>How to keep</Tab>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Benefits</Tab>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Composition</Tab>
                                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Cautions</Tab>
                                            </TabList>
                                            <TabPanels align='center'>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.penyajian}</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.dosis}</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.caraPenyimpanan}</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.kegunaan}</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.komposisi}</p>
                                                </TabPanel>
                                                <TabPanel>
                                                    <p className='heading4'>{detail.efekSamping}</p>
                                                </TabPanel>
                                            </TabPanels>
                                        </>
                                    }
                                </Tabs>
                            </div>
                        </>
                        :
                        <div className='m-auto container' style={{ height: '72vh', }}>
                            <h1 className='heading1' style={{ paddingTop: 100, paddingBottom: 10, textAlign: "center" }}>
                                STOCK IS EMPTY
                            </h1>
                        </div>
                }
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}
export default connect(mapToProps, { addToCartAction })(ProductDetail);