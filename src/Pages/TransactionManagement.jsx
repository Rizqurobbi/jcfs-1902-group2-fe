import axios from 'axios';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../helper';
class TransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionsList: []
        }
    }
    componentDidMount() {
        this.getTransactionsAdmin()
    }
    getTransactionsAdmin = () => {
        let token = localStorage.getItem('data')
        if (token) {
            axios.get(`${API_URL}/transactions/admintransactions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => {
                    this.setState({ transactionsList: res.data.dataTransactionAdmin })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    printTransactionList = () => {
        let { transactionsList } = this.state
        return transactionsList.map((value, index) => {
            let badgeColor = value.status.includes("Ongoing") ? "warning" : "success"
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{value.date}</span>
                    <b style={{ marginLeft: 10 }}>{value.invoice}</b>
                    <Badge color={badgeColor} style={{ float: 'right', fontSize: 16 }}>{value.status}</Badge>
                </div>
                <div className="row p-3">
                    <div className="col-md-2">
                        <img src={API_URL + value.detail[0].url} width="80%" />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray", marginLeft: -50 }}>
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                    </div>
                    <div className="col-md-2 d-flex flex-column justify-content-center">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.total_payment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right", paddingRight: 30 }}>
                    <Button color="primary" outline style={{ border: "none", fontSize: 12, marginLeft: 10 }}>
                        Detail Transactions
                    </Button>
                </div>
            </div>
        })
    }
    render() {
        console.log(this.state.transactionsList)
        return (
            <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                    <p className='heading2 pb-2'>Transactions Management</p>
                    <Tabs size='md' colorScheme='#231953'>
                        <>
                            <TabList style={{ marginBottom: 30 }}>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Ongoing transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Past transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Doctor's prescription transactions</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel className='p-0'>
                                    {this.printTransactionList()}
                                </TabPanel>
                                <TabPanel className='p-0'>
                                    {/* {this.printPastTransactions()} */}
                                </TabPanel>
                                <TabPanel>

                                </TabPanel>

                            </TabPanels>
                        </>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default TransactionManagement;