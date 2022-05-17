import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import { API_URL } from '../helper';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button, Input, InputGroup, Table, ButtonGroup } from 'reactstrap';
import RV from '../img/revenue.jpg'
Chart.register(CategoryScale);
class RevenuePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: [],
            page: 1
        }
    }
    componentDidMount() {
        this.getRevenue()
    }
    getRevenue = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (search) {
            if (search.inDateStart && search.inDateEnd) {
                res = axios.get(`${API_URL}/transactions/revenue?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ revenue: res.data.dataRevenue })
                }).catch(err => [
                    console.log(err)
                ])
            } else {
                res = axios.get(`${API_URL}/transactions/revenue`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(res => {
                    this.setState({ revenue: res.data.dataRevenue })
                }).catch(err => [
                    console.log(err)
                ])
            }
        } else {
            res = axios.get(`${API_URL}/transactions/revenue`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                this.setState({ revenue: res.data.dataRevenue })
            }).catch(err => [
                console.log(err)
            ])
        }
    }
    printRevenue = () => {
        let { page } = this.state
        return this.state.revenue.slice(page > 1 ? (page - 1) * 4 : page - 1, page * 4).map((value, index) => {
            if (value.date == value.date) {
                console.log(value.date == value.date)
                return (
                    <tr>
                        <td>
                            <p>{value.date}</p>
                        </td>
                        <td>
                            <p>Rp.{value.total.toLocaleString()}</p>
                        </td>
                    </tr >
                )
            }
        })
    }
    btnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.revenue.length / 4); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
                    className='NavbarButton'
                    disabled={this.state.page == i + 1 ? true : false}
                    onClick={() => this.setState({ page: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    printFilterDate = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartUser = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndUser = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px' }} onClick={this.btnResetRevenue}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px' }} onClick={this.handleDateRevenue}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    printLineChart = () => {
        return (
            <Line
                data={{
                    labels: this.state.revenue.map((value, index) => {
                        return (
                            `${value.date}`
                        )
                    }),
                    datasets: [
                        {
                            label: 'Total',
                            data: this.state.revenue.map((value, index) => {
                                return (
                                    `${value.total}`
                                )
                            }),
                            backgroundColor: [
                                'lightblue'
                            ],
                            indexAxis: 'x'
                        }
                    ]
                }} />
        )
    }
    handleDateRevenue = () => {
        this.getRevenue({
            inDateStart: this.inDateStartUser.value,
            inDateEnd: this.inDateEndUser.value,
        })
    }
    btnResetRevenue = () => {
        this.inDateStartUser.value = ''
        this.inDateEndUser.value = ''
        this.getRevenue()
    }
    printTotalRevenue = () => {
        return (
            <div style={{ background: 'white', height: 180, width: 180, marginLeft: 'auto', paddingLeft: 20, paddingRight: 20, paddingTop: 10, border: '1px solid lightgray' }}>
                <div style={{ textAlign: 'center' }}>
                    <p className='heading3' style={{ fontSize: '18px' }}>NOTES</p>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    <p className='heading4' style={{}}>Total : Rp.{this.totalRevenue().toLocaleString()}</p>
                </div>
            </div>
        )
    }
    totalRevenue = () => {
        let total = 0;
        this.state.revenue.forEach((value) => total += value.total)
        return total
    }
    render() {
        console.log(this.state.revenue)
        return (
            <div className='container-fluid'>
                <div className="container">
                    <div style={{ backgroundPosition: '10% 30%', backgroundSize: 'cover', backgroundImage: "url(" + RV + ")", backgroundRepeat: 'no-repeat', width: '100%', height: '32vh', borderRadius: '50px', opacity: '' }}>
                        <div style={{ paddingTop: '14vh', paddingLeft: '548px' }}>
                            <h1 className='heading1' style={{ color: 'black', fontWeight: 900 }}>Revenue</h1>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div>
                            {this.printFilterDate()}
                        </div>
                        <Tabs align='center' colorScheme='#231953' size='md'>
                            <>
                                <TabList>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, marginRight: '100px', fontSize: 16 }}>Table</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>Graphic</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div className='d-flex' style={{marginTop:'10px'}}>
                                            <Table bordered style={{ textAlign: 'center', }}>
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.printRevenue()}
                                                </tbody>
                                            </Table>
                                            <div style={{ marginLeft: 20 }}>
                                                {this.printTotalRevenue()}
                                            </div>
                                        </div>
                                        <div className="my-5 text-center">
                                            <ButtonGroup>
                                                {this.btnPagination()}
                                            </ButtonGroup>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div>
                                        </div>
                                        <div className='d-flex'>
                                            {this.printLineChart()}
                                            <div style={{ marginLeft: 20 }}>
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </>
                        </Tabs>
                    </div>
                </div>
            </div >
        );
    }
}

export default RevenuePage;