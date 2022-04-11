import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Input, } from '@chakra-ui/react'
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import logo from '../img/logofix.png'
import axios from 'axios';
import { API_URL } from '../helper';
import { Link } from 'react-router-dom';
import { IoRemoveCircleOutline, IoAddCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { addToCartAction } from '../redux/actions';
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
        let { detail, counter } = this.state
        let dataCart = {
            idproduct: detail.idproduct,
            idstock: detail.stocks[0].idstock,
            qty: counter,
            qtyStock: detail.stocks[0].qty - counter,
            qtyTotal: (detail.stocks[0].qty - counter) * detail.stocks[1].qty,
            idstockTotal: detail.stocks[2].idstock
        }
        if (this.props.username) {
            let res = await this.props.addToCartAction(dataCart)
            if (res.success) {
                this.setState({ redirect: true })
            } else {
                alert(`KOSONG`)
            }
        } else {
            alert('LOGIN')
        }
    }
    btnIncrement = (num) => {
        if (this.state.counter < this.state.detail.stocks[0].qty) {
            this.state.counter += num
            this.setState({ coonter: this.state.counter })
        } else {
            alert(`Hai`)
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
    renderImages = () => {
        let { detail } = this.state
        let { images } = detail
        return images.map((value, index) => {
            return (
                <img className="select-image mb-1 my-2 rounded" style={{ border: '1px solid', marginRight: 10 }} src={API_URL + value.url}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ border: this.state.thumbnail == index && "2px solid", cursor: 'pointer' }}
                />
            )
        })
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
                                <div className='col-4 d-flex'>
                                    {this.renderImages()}
                                </div>
                            </div>
                        </div>
                        <div className='col-6' style={{ paddingTop: 20 }}>

                            <div style={{ alignItems: 'center' }}>
                                <p style={{ color: '#231953', fontSize: 30 }}>{detail.nama} ({detail.stocks[1].qty}{detail.stocks[1].satuan})</p>
                                <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '30px' }}>Rp. {detail.harga.toLocaleString()}</p>
                                <p style={{ fontWeight: 'bolder', marginTop: '14px' }} className='heading4'>{detail.deskripsi}</p>
                                <p style={{ paddingTop: 15, paddingBottom: 15, fontSize: 15, color: '#231953', fontWeight: 'bold' }}>Available : {detail.stocks[0].qty} {detail.stocks[0].satuan}</p>
                                <div>

                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='d-flex'>
                                    <IoRemoveCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F', cursor: 'pointer' }} onClick={() => this.btnDecrement(1)} />
                                    <Input textAlign='center' value={this.state.counter} type="number" width='12' style={{ borderRadius: 2.9 }} border='none'></Input>
                                    <IoAddCircleOutline style={{ fontSize: 30, marginTop: 5, color: '#1E144F', cursor: 'pointer' }} onClick={() => this.btnIncrement(1)} />
                                </div>
                                <button onClick={this.btnAddToCart} style={{ marginLeft: 'auto', width: '200px' }} className='landing1'>Add To Cart</button>
                            </div>

                        </div>
                    </>
                }
            </div>

        )
    }
    render() {
        let { detail } = this.state
        console.log(this.state.counter)
        // console.log('cek data qty detail',detail.qty)
        if (this.state.redirect) {
            return <Navigate to='/cart-user' />
        }
        return (
            <div style={{ background: '#F6F7FB' }}>
                <div style={{ backgroundColor: '#F6F7FB', height: 50 }}>
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
                    <Tabs size='md' align='center' colorScheme='#231953' style={{ marginTop: 80 }}>
                        {detail.idproduct &&
                            <>
                                <TabList>
                                    <Tab >Penyajian</Tab>
                                    <Tab >Dosis</Tab>
                                    <Tab>Cara Penyimpanan</Tab>
                                    <Tab>Kegunaan</Tab>
                                    <Tab>Kommposisi</Tab>
                                    <Tab>Perhatian</Tab>
                                </TabList>
                                <TabPanels align='start'>
                                    <TabPanel>
                                        <p>{detail.penyajian}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>{detail.dosis}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>{detail.caraPenyimpanan}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>{detail.kegunaan}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>{detail.komposisi}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>{detail.efekSamping}</p>
                                    </TabPanel>
                                </TabPanels>
                            </>
                        }
                    </Tabs>
                </div>
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}
export default connect(mapToProps, { addToCartAction })(ProductDetail);