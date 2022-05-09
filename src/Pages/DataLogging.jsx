import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Table, Row, Button } from 'reactstrap';
import { API_URL } from '../helper';
import pills from '../img/pillsimage.jpg';


class DataLogging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLogOut: [],
            dataLogIn: [],
            pageOut: 1,
            pageIn: 1
        }
    }

    componentDidMount() {
        this.getDataLoggingOut()
        this.getDataLoggingIn()
    }

    getDataLoggingOut = () => {
        let token = localStorage.getItem('data')
        axios.get(`${API_URL}/transactions/outdatalog`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        dataLogOut: res.data.dataOutlog
                    })
                }
            })
    }
    getDataLoggingIn = () => {
        let token = localStorage.getItem('data')
        axios.get(`${API_URL}/transactions/indatalog`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        dataLogIn: res.data.dataInlog
                    })
                }
            })
    }

    printDataLoggingOut = () => {
        let { pageOut } = this.state
        return this.state.dataLogOut.slice(pageOut > 1 ? (pageOut - 1) * 5 : pageOut - 1, pageOut * 5).map((value, index) => {
            return (
                <tr>
                    <td>{pageOut > 1 ? (pageOut - 1) * 5 + index + 1 : index + 1}</td>
                    <td style={{ width: '13%' }}>
                        <img src={value.url.includes('http') ? value.url : API_URL + value.url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt="" />
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.qty} {value.satuan}</td>
                    <td>{value.date}</td>
                    <td>{value.description}</td>
                </tr>
            )
        })
    }

    printDataLoggingIn = () => {
        let { pageIn } = this.state
        return this.state.dataLogIn.slice(pageIn > 1 ? (pageIn - 1) * 5 : pageIn - 1, pageIn * 5).map((value, index) => {
            return (
                <tr>
                    <td>{pageIn > 1 ? (pageIn - 1) * 5 + index + 1 : index + 1}</td>
                    <td style={{ width: '13%' }}>
                        <img src={value.url.includes('http') ? value.url : API_URL + value.url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt="" />
                    </td>
                    <td>{value.nama}</td>
                    <td>{value.qty} {value.satuan}</td>
                    <td>{value.date}</td>
                    <td>{value.description}</td>
                </tr>
            )
        })
    }

    renderBtnDataLoggingOutPage = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.dataLogOut.length / 5); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    style={{ border: 'none', marginRight: 5 }}
                    disabled={this.state.pageOut == i + 1 ? true : false}
                    onClick={() => this.setState({ pageOut: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    renderBtnDataLoggingInPage = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.dataLogIn.length / 5); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    style={{ border: 'none', marginRight: 5 }}
                    disabled={this.state.pageIn == i + 1 ? true : false}
                    onClick={() => this.setState({ pageIn: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    render() {
        console.log('inidataout', this.state.dataLogOut)
        console.log('inidatain', this.state.dataLogIn)
        return (
            <div className='container-fluid' style={{ backgroundColor: '#FCFBFA' }}>
                <div className='container pt-4' style={{ backgroundColor: '#FCFBFA', textAlign: 'center' }}>
                    <div style={{ backgroundPosition: '20% 30%', backgroundSize: 'cover', backgroundImage: `url('${pills}')`, backgroundRepeat: 'no-repeat', width: '100%', height: '32vh', borderRadius: '50px', marginBottom: 50 }}>
                        <div style={{ paddingTop: '11vh', paddingRight: '500px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Stocks Record</h1>
                        </div>
                    </div>
                    <Tabs size='md' align='center' colorScheme='#231953'>
                        <>
                            <TabList style={{ marginBottom: 30 }}>
                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, marginRight: 100, fontSize: 16 }}>Product In</Tab>
                                <Tab className='heading2 px-5' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 16 }}>Product Out</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel className='p-0'>
                                    <Table className='text-center'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Picture</th>
                                                <th>Name Product</th>
                                                <th>Qty In Stock</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.printDataLoggingIn()}
                                        </tbody>
                                    </Table>
                                    <div className='text-center'>
                                        {this.renderBtnDataLoggingInPage()}
                                    </div>
                                </TabPanel>
                                <TabPanel className='p-0'>
                                    <Table className='text-center'>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Picture</th>
                                                <th>Name Product</th>
                                                <th>Qty Out Stock</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.printDataLoggingOut()}

                                        </tbody>
                                    </Table>
                                    <div className='text-center'>
                                        {this.renderBtnDataLoggingOutPage()}
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DataLogging;