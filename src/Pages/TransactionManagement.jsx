import axios from 'axios';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../helper';
import ModalDetailTransactionManagement from '../Components/ModalDetailTransactionManagement';
import moment from 'moment';
class TransactionManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionsList: [],
            modalOpenDetail: false,
            detailTransaction: [],
            pageAll: 1,
            pageOngoing: 1,
            pagePast: 1
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
    printAllTransactionList = () => {
        let { transactionsList, pageAll } = this.state
        return transactionsList.slice(pageAll > 1 ? (pageAll - 1) * 4 : pageAll - 1, pageAll * 4).map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Ongoing") ? "warning" : value.status.includes("Waiting") ? 'secondary' : value.status.includes("Completed") ? 'success' : value.status.includes("Process") ? 'info' : 'danger'
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton d-flex" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{newDate}</span>
                    <b style={{ marginLeft: 10 }}>{value.invoice}</b>
                    <div className='d-flex ' style={{ marginLeft: 'auto' }}>
                        <b style={{ paddingRight: 20 }}>{value.username}</b>
                        <Badge color={badgeColor} style={{ fontSize: 16 }}>{value.status}</Badge>
                    </div>
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
                    <Button color="primary" outline style={{ border: "none", fontSize: 12, marginLeft: 10 }} onClick={() => this.setState({ modalOpenDetail: !this.state.modalOpenDetail, transaction: value, detailTransaction: value.detail })}>
                        Detail Transactions
                    </Button>
                </div>
            </div>
        })
    }
    printOngoingTransactionList = () => {
        let { transactionsList,pageOngoing } = this.state
        return transactionsList.slice(pageOngoing > 1 ? (pageOngoing - 1) * 4 : pageOngoing - 1, pageOngoing * 4).map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Ongoing") ? "warning" : value.status.includes("Waiting") ? 'secondary' : value.status.includes("Process") ? 'info' : 'danger'
            if (value.status.includes('Ongoing') || value.status.includes('Waiting') || value.status.includes('Process')) {
                return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                    <div className="py-3 px-5 NavbarButton d-flex" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <span>{newDate}</span>
                        <div className='d-flex ' style={{ marginLeft: 'auto' }}>
                            <b style={{ paddingRight: 20 }}>{value.username}</b>
                            <Badge color={badgeColor} style={{ fontSize: 16 }}>{value.status}</Badge>
                        </div>
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
                        <Button color="primary" outline style={{ border: "none", fontSize: 12, marginLeft: 10 }} onClick={() => this.setState({ modalOpenDetail: !this.state.modalOpenDetail, transaction: value, detailTransaction: value.detail })}>
                            Detail Transactions
                        </Button>
                    </div>
                </div>
            }
        })
    }
    printPastTransactionList = () => {
        let { transactionsList,pagePast } = this.state
        return transactionsList.slice(pagePast > 1 ? (pagePast - 1) * 4 : pagePast - 1, pagePast * 4).map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Completed") ? "success" : "danger"
            if (value.status.includes('Completed') || value.status.includes('Canceled')) {
                return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                    <div className="py-3 px-5 NavbarButton d-flex" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <span>{newDate}</span>
                        <div className='d-flex ' style={{ marginLeft: 'auto' }}>
                            <b style={{ paddingRight: 20 }}>{value.username}</b>
                            <Badge color={badgeColor} style={{ fontSize: 16 }}>{value.status}</Badge>
                        </div>
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
                        <Button color="primary" outline style={{ border: "none", fontSize: 12, marginLeft: 10 }} onClick={() => this.setState({ modalOpenDetail: !this.state.modalOpenDetail, transaction: value, detailTransaction: value.detail })}>
                            Detail Transactions
                        </Button>
                    </div>
                </div>
            }
        })
    }
    printBtnPaginationAll = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.transactionsList.length / 4); i++) {
            btn.push(
                <Button
                    style={{ border: "none" }}
                    className='NavbarButton'
                    disabled={this.state.pageAll == i + 1 ? true : false}
                    onClick={() => this.setState({ pageAll: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    printBtnPaginationOngoing = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.transactionsList.length / 4); i++) {
            btn.push(
                <Button
                    style={{ border: "none" }}
                    className='NavbarButton'
                    disabled={this.state.pageOngoing == i + 1 ? true : false}
                    onClick={() => this.setState({ pageOngoing: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    printBtnPaginationPast = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.transactionsList.length / 4); i++) {
            btn.push(
                <Button
                    style={{ border: "none" }}
                    className='NavbarButton'
                    disabled={this.state.pagePast == i + 1 ? true : false}
                    onClick={() => this.setState({ pagePast: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
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
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>All Transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Ongoing transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Past transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Doctor's prescription transactions</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel className='p-0'>
                                    {this.printAllTransactionList()}
                                    <div className="text-center">
                                        {this.printBtnPaginationAll()}
                                    </div>
                                </TabPanel>
                                <TabPanel className='p-0'>
                                    {this.printOngoingTransactionList()}
                                    <div className="text-center">
                                        {this.printBtnPaginationOngoing()}
                                    </div>
                                </TabPanel>
                                <TabPanel className='p-0'>
                                    {this.printPastTransactionList()}
                                    <div className="text-center">
                                        {this.printBtnPaginationPast()}
                                    </div>
                                </TabPanel>

                            </TabPanels>
                        </>
                    </Tabs>
                </div>
                <ModalDetailTransactionManagement
                    modalOpen={this.state.modalOpenDetail}
                    detailTransaction={this.state.detailTransaction}
                    transaction={this.state.transaction}
                    btClose={() => this.setState({ modalOpenDetail: !this.state.modalOpenDetail })}
                />
            </div>
        );
    }
}

export default TransactionManagement;