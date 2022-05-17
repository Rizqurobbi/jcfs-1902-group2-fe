import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import { connect } from 'react-redux';
import { Button, Input, InputGroup, Table, ButtonGroup } from 'reactstrap';
import { API_URL } from '../helper';
import SR from '../img/salesreport.jpg'
Chart.register(CategoryScale);
class SalesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            salesReport: [],
            salesReportByrecipe: [],
            pageUserCart: 1,
            pageRecipe: 1
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
                    this.setState({ salesReport: res.data.dataSalesReportUser, pageUserCart: 1 })
                }).catch(err => [
                    console.log(err)
                ])
            } else {
                res = axios.get(`${API_URL}/transactions/salesreportuser`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReport: res.data.dataSalesReportUser, pageUserCart: 1 })
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
                this.setState({ salesReport: res.data.dataSalesReportUser, pageUserCart: 1 })
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
                    this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe, pageRecipe: 1 })
                }).catch(err => [
                    console.log(err)
                ])
            } else {
                res = axios.get(`${API_URL}/transactions/salesreportrecipe`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe, pageRecipe: 1 })
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
                this.setState({ salesReportByrecipe: res.data.dataSalesReportRecipe, pageRecipe: 1 })
            }).catch(err => [
                console.log(err)
            ])
        }
    }
    printSalesReportUserCart = () => {
        let { pageUserCart } = this.state
        return this.state.salesReport.slice(pageUserCart > 1 ? (pageUserCart - 1) * 5 : pageUserCart - 1, pageUserCart * 5).map((value, index) => {
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
    printTotalSalesReportUserCart = () => {
        return (
            <div style={{ background: 'white', height: 180, width: 180, marginLeft: 'auto', paddingLeft: 20, paddingRight: 20, paddingTop: 10, border: '1px solid lightgray' }}>
                <div>
                    <p className='heading3' style={{ fontSize: '18px' }}>NOTES</p>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <p className='heading4' style={{}}>Total : Rp.{this.totalForUserCart().toLocaleString()}</p>
                </div>

            </div>
        )
    }
    totalForUserCart = () => {
        let total = 0;
        this.state.salesReport.forEach((value) => total += value.total)
        return total
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
    btnPaginationUserCart = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.salesReport.length / 5); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
                    className='NavbarButton'
                    disabled={this.state.pageUserCart == i + 1 ? true : false}
                    onClick={() => this.setState({ pageUserCart: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    printSalesReportByRecipe = () => {
        let { pageRecipe } = this.state
        return this.state.salesReportByrecipe.slice(pageRecipe > 1 ? (pageRecipe - 1) * 5 : pageRecipe - 1, pageRecipe * 5).map((value, index) => {
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
    printTotalSalesReportByRecipe = () => {
        return (
            <div style={{ background: 'white', height: 180, width: 180, marginLeft: 'auto', paddingLeft: 20, paddingRight: 20, paddingTop: 10, border: '1px solid lightgray' }}>
                <div>
                    <p className='heading3' style={{ fontSize: '18px' }}>NOTES</p>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <p className='heading4' style={{}}>Total : Rp.{this.totalForRecipe().toLocaleString()}</p>
                </div>

            </div>
        )
    }
    totalForRecipe = () => {
        let total = 0;
        this.state.salesReportByrecipe.forEach((value) => total += value.total)
        return total
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
    btnPaginationRecipe = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.salesReportByrecipe.length / 5); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
                    className='NavbarButton'
                    disabled={this.state.pageRecipe == i + 1 ? true : false}
                    onClick={() => this.setState({ pageRecipe: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    printChartLineUserCart = () => {
        return (
            <Bar
                data={{
                    labels: this.state.salesReport.map((value, index) => {
                        return (
                            `${value.nama}`
                        )
                    }),
                    datasets: [
                        {
                            label: 'Qty',
                            data: this.state.salesReport.map((value, index) => {
                                return (
                                    `${value.qty}`
                                )
                            }),
                            backgroundColor: [
                                'lightblue'
                            ],
                            indexAxis: 'y'
                        }
                    ]
                }} />
        )
    }
    printChartLineRecipe = () => {
        return (
            <Bar
                data={{
                    labels: this.state.salesReportByrecipe.map((value, index) => {
                        return (
                            `${value.nama}`
                        )
                    }),
                    datasets: [
                        {
                            label: 'Qty',
                            data: this.state.salesReportByrecipe.map((value, index) => {
                                return (
                                    `${(value.qty)}`
                                )
                            }),
                            backgroundColor: [
                                'pink'
                            ],
                            indexAxis: 'y'
                        }
                    ]
                }} />
        )
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
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, marginRight: '100px', fontSize: 16 }}>From User Cart</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>By Recipe</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div>
                                            {this.printFilterDateUser()}
                                        </div>
                                        <div className='d-flex'>
                                            {/* <div className='col-8'> */}
                                            <Table bordered style={{ textAlign: 'center', }}>
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Image</th>
                                                        <th style={{ width: '500px' }}>Product</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.printSalesReportUserCart()}
                                                </tbody>
                                            </Table>
                                            {/* </div> */}
                                            <div style={{ marginLeft: 20 }}>
                                                {this.printTotalSalesReportUserCart()}
                                            </div>
                                        </div>
                                        <div className="my-5 text-center">
                                            <ButtonGroup>
                                                {this.btnPaginationUserCart()}
                                            </ButtonGroup>
                                        </div>
                                        {this.printChartLineUserCart()}
                                    </TabPanel>
                                    <TabPanel>
                                        <div>
                                            {this.printFilterDateRecipe()}
                                        </div>
                                        <div className='d-flex'>
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
                                            <div style={{ marginLeft: 20 }}>
                                                {this.printTotalSalesReportByRecipe()}
                                            </div>
                                        </div>
                                        <div className="my-5 text-center">
                                            <ButtonGroup>
                                                {this.btnPaginationRecipe()}
                                            </ButtonGroup>
                                        </div>
                                        {this.printChartLineRecipe()}
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