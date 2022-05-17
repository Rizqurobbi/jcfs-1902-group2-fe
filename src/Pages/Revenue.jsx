import axios from 'axios';
import React from 'react';
import { API_URL } from '../helper';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button, Input, InputGroup, Table } from 'reactstrap';
import RV from '../img/revenue.jpg'
class RevenuePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: []
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
            }else{
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
        }else{
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
        return this.state.revenue.map((value, index) => {
            if (value.date == value.date) {
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
                        <div className='d-flex'>
                            {/* <div className='col-8'> */}
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
                            {/* </div> */}
                            <div style={{ marginLeft: 20 }}>
                                {this.printTotalRevenue()}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default RevenuePage;