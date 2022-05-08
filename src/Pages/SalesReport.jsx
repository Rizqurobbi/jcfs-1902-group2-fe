import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputGroup, Table } from 'reactstrap';
import { API_URL } from '../helper';
import SR from '../img/salesreport.jpg'
class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesReport: [],
            salesReportByrecipe: []
        }
    }
    componentDidMount() {
        this.getSalesReportUserCart()
        this.getSalesReportByRecipe()
    }
    getSalesReportUserCart = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (search) {
            if (search.inDateStart && search.inDateEnd) {
                res = axios.get(`${API_URL}/transactions/salesreportuser?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReport: res.data.dataSalesReportUser })
                }).catch(err => [
                    console.log(err)
                ])
            } else {
                res = axios.get(`${API_URL}/transactions/salesreportuser`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReport: res.data.dataSalesReportUser })
                }).catch(err => [
                    console.log(err)
                ])
            }
        } else {
            res = axios.get(`${API_URL}/transactions/salesreportuser`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                this.setState({ salesReport: res.data.dataSalesReportUser })
            }).catch(err => [
                console.log(err)
            ])
        }

    }
    getSalesReportByRecipe = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (search) {
            if (search.inDateStart && search.inDateEnd) {
                res = axios.get(`${API_URL}/transactions/salesreportrecipe?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe })
                }).catch(err => [
                    console.log(err)
                ])
            } else {
                res = axios.get(`${API_URL}/transactions/salesreportrecipe`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe })
                }).catch(err => [
                    console.log(err)
                ])
            }
        } else {
            res = axios.get(`${API_URL}/transactions/salesreportrecipe`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe })
            }).catch(err => [
                console.log(err)
            ])
        }
    }
    printSalesReportUserCart = () => {
        return this.state.salesReport.map((value, index) => {
            return (
                <tr>
                    <td>
                        <p>{value.date}</p>
                    </td>
                    <td style={{ width: '13%' }}>
                        <img src={API_URL + value.url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </td>
                    <td>
                        <p>{value.nama}</p>
                    </td>
                    <td>
                        <p>{value.qty} {value.satuan}</p>
                    </td>
                    <td>
                        <p>Rp.{value.total.toLocaleString()}</p>
                    </td>
                </tr >
            )
        })
    }
    printFilterDateUser = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartUser = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndUser = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px' }} onClick={this.btnResetUser}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px' }} onClick={this.handleDateUser}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    handleDateUser = () => {
        this.getSalesReportUserCart({
            inDateStart: this.inDateStartUser.value,
            inDateEnd: this.inDateEndUser.value,
        })
    }
    btnResetUser = () => {
        this.inDateStartUser.value = ''
        this.inDateEndUser.value = ''
        this.getSalesReportUserCart()
    }
    printSalesReportByRecipe = () => {
        return this.state.salesReportByrecipe.map((value, index) => {
            return (
                <tr>
                    <td>
                        <p>{value.date}</p>
                    </td>
                    <td style={{ width: '13%' }}>
                        <img src={API_URL + value.url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </td>
                    <td>
                        <p>{value.nama}</p>
                    </td>
                    <td>
                        <p>{value.qty}</p>
                    </td>
                    <td>
                        <p>Rp.{value.total.toLocaleString()}</p>
                    </td>
                </tr >
            )
        })
    }
    printFilterDateRecipe = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartRecipe = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndRecipe = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px' }} onClick={this.btnResetRecipe}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px' }} onClick={this.handleDateRecipe}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    handleDateRecipe = () => {
        this.getSalesReportByRecipe({
            inDateStart: this.inDateStartRecipe.value,
            inDateEnd: this.inDateEndRecipe.value,
        })
    }
    btnResetRecipe = () => {
        this.inDateStartRecipe.value = ''
        this.inDateEndRecipe.value = ''
        this.getSalesReportByRecipe()
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className="container">
                    <div style={{ backgroundPosition: '10% 30%', backgroundSize: 'cover', backgroundImage: "url(" + SR + ")", backgroundRepeat: 'no-repeat', width: '100%', height: '32vh', borderRadius: '50px' }}>
                        <div style={{ paddingTop: '11vh', paddingLeft: '260px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Sales Report</h1>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <Tabs align='center' colorScheme='#231953' size='md'>
                            <>
                                <TabList>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, marginRight: '100px' }}>From User Cart</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>By Recipe</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div>
                                            {this.printFilterDateUser()}
                                        </div>
                                        <Table bordered style={{ textAlign: 'center', }}>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Image</th>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.printSalesReportUserCart()}
                                            </tbody>
                                        </Table>
                                    </TabPanel>
                                    <TabPanel>
                                        <div>
                                            {this.printFilterDateRecipe()}
                                        </div>
                                        <Table bordered style={{ textAlign: 'center', }}>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Image</th>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.printSalesReportByRecipe()}
                                            </tbody>
                                        </Table>
                                    </TabPanel>
                                </TabPanels>
                            </>
                        </Tabs>

                    </div>
                </div>

            </div>
        );
    }
}
const mapToProps = (state) => {

}

export default connect(mapToProps, {})(SalesReport);