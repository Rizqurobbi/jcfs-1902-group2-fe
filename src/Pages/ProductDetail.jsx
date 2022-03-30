import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Input, } from '@chakra-ui/react'
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import logo from '../img/logofix.png'
import axios from 'axios';
import { API_URL } from '../helper';
import { Link } from 'react-router-dom';
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            detail: {},
            thumbnail: 0,

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
    renderImages = () => {
        let { detail } = this.state
        let { images } = detail
        return images.map((value, index) => {
            return (
                <img className="select-image mb-1 my-2 rounded" style={{ border: '1px solid', marginRight: 10 }} src={value.url}
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
                                <img style={{ borderRadius: 8 }} src={detail.images[0].url} width="100%" alt="" />
                                <div className='col-4 d-flex'>
                                    {this.renderImages()}
                                </div>
                            </div>
                        </div>
                        <div className='col-6' style={{ paddingTop: 20 }}>

                            <div style={{ alignItems: 'center' }}>
                                <p style={{ color: '#231953', fontSize: 30 }}>{detail.nama} ({detail.berat}{detail.satuan})</p>
                                <p style={{ color: '#231953', fontWeight: 'bolder', fontSize: '30px' }}>Rp. {detail.harga.toLocaleString()}</p>
                                <p style={{ fontWeight: 'bolder', marginTop: '14px' }} className='heading4'>{detail.deskripsi}</p>
                                <p style={{ paddingTop: 15, paddingBottom: 15, fontSize: 15, color: '#231953', fontWeight: 'bold' }}>Available : {detail.stocks[0].qty} {detail.stocks[0].type} ({detail.berat * detail.stocks[0].qty}{detail.satuan})</p>
                                <div>

                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='d-flex'>
                                    <button className='NavbarButton'><IoIosRemove color='white' fontSize='20' /></button>
                                    <Input textAlign='center' value={this.state.count} type="number" width='12' style={{ borderRadius: 2.9 }} border='none'></Input>
                                    <button className='NavbarButton'><IoIosAdd color='white' fontSize='20' /></button>
                                </div>
                                <button style={{ marginLeft: 'auto', width: '200px' }} className='landing1'>Add To Cart</button>
                            </div>

                        </div>
                    </>
                }
            </div>

        )
    }
    render() {
        let { detail } = this.state
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

export default ProductDetail;