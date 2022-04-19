import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge, Button } from 'reactstrap';
import { getTransactionsActions } from '../redux/actions/transactionsAction';
import { keepAction } from '../redux/actions/userAction';
import { connect } from 'react-redux';
import { API_URL } from '../helper';
import ModalDetailTransaction from '../Components/ModalDetailTransaction';
import moment from 'moment';
import axios from 'axios';
class HistoryTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDetail: false,
            detailTransaction: [],
            transaction: {},
            ongoingTransactions: [],
            pageAll: 1,
            pageOngoing: 1
        }
    }

    componentDidMount() {
        this.props.getTransactionsActions()
        this.getOngoingTransactions()
    }

    getOngoingTransactions = async () => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/ongoingusertransactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    this.setState({
                        ongoingTransactions: res.data.dataTransaction
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    renderBtnAllPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.transactions.length / 4); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    style={{ border: 'none', marginRight: 5 }}
                    disabled={this.state.pageAll == i + 1 ? true : false}
                    onClick={() => this.setState({ pageAll: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    renderBtnOngoingPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.ongoingTransactions.length / 4); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    style={{ border: 'none', marginRight: 5 }}
                    disabled={this.state.pageOngoing == i + 1 ? true : false}
                    onClick={() => this.setState({ pageOngoing: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    onBtnDiscard = async (idtransaction) => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.patch(`${API_URL}/transactions/discardtransaction`, { idtransaction: idtransaction }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    await alert('Discard Success')
                    this.props.getTransactionsActions()
                    this.getOngoingTransactions()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    printTransactions = () => {
        let { pageAll } = this.state
        return this.props.transactions.slice(pageAll > 1 ? (pageAll - 1) * 3 : pageAll - 1, pageAll * 3).map((value, index) => {
            let badgeColor = value.status.includes("Waiting") ? "secondary" : value.status.includes("Process") ? "primary" :
                value.status.includes("Ongoing") ? "warning" : value.status.includes("Completed") ? "success" : "danger"
            let date = value.date
            let newDate = moment(date).format("LLL")
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{newDate}</span>
                    <Badge className='mx-3' color={badgeColor} style={{ fontSize: 16 }}>{value.status}</Badge>
                    <b>{value.invoice}</b>
                    <div style={{ float: 'right' }}>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-md-2">
                        <img src={API_URL + value.detail[0].url} width="80%" />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray" }}>
                        <h4 style={{ fontWeight: "bolder", fontSize: 18 }}>{value.detail[0].nama}</h4>
                        <p className="text-muted mb-2" style={{ fontSize: 14 }}>{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        {
                            value.detail.length > 1 ?
                                <p className='text-muted' style={{ fontSize: 14 }}>+{value.detail.length - 1} other products</p>
                                :
                                null
                        }
                    </div>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                        <p className="text-muted">Total Payment</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.total_payment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right", paddingRight: 30 }}>
                    {
                        value.status.includes('Completed') || value.status.includes('Canceled') ?
                            <div>
                                <Button color="primary" outline style={{ border: "none", fontSize: 12 }}
                                    onClick={() => this.setState({ modalDetail: !this.state.modalDetail, detailTransaction: value.detail, transaction: value })}>
                                    Detail Transactions
                                </Button>
                            </div> :
                            <div>
                                <Button color="primary" outline style={{ border: "none", fontSize: 12 }}
                                    onClick={() => this.setState({ modalDetail: !this.state.modalDetail, detailTransaction: value.detail, transaction: value })}>
                                    Detail Transactions
                                </Button>
                                <Button color="danger" style={{ fontSize: 12, marginLeft: 10 }} onClick={() => this.onBtnDiscard(value.idtransaction)}>Discard Order</Button>
                            </div>
                    }
                </div>
            </div>
        })
    }

    printOngoingTransactions = () => {
        let { pageOngoing } = this.state
        return this.state.ongoingTransactions.slice(pageOngoing > 1 ? (pageOngoing - 1) * 3 : pageOngoing - 1, pageOngoing * 3).map((value, index) => {
            let badgeColor = value.status.includes("Waiting") ? "secondary" : value.status.includes("Process") ? "primary" :
                value.status.includes("Ongoing") ? "warning" : value.status.includes("Completed") ? "success" : "danger"
            let date = value.date
            let newDate = moment(date).format("LLL")
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{newDate}</span>
                    <Badge className='mx-3' color={badgeColor} style={{ fontSize: 16 }}>{value.status}</Badge>
                    <b>{value.invoice}</b>
                    <div style={{ float: 'right' }}>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-md-2">
                        <img src={API_URL + value.detail[0].url} width="80%" />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid gray" }}>
                        <h4 style={{ fontWeight: "bolder", fontSize: 18 }}>{value.detail[0].nama}</h4>
                        <p className="text-muted mb-2" style={{ fontSize: 14 }}>{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        {
                            value.detail.length > 1 ?
                                <p className='text-muted' style={{ fontSize: 14 }}>+{value.detail.length - 1} other products</p>
                                :
                                null
                        }
                    </div>
                    <div className="col-md-3 d-flex flex-column justify-content-center">
                        <p className="text-muted">Total Payment</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.total_payment.toLocaleString()}</h4>
                    </div>
                </div>
                <div style={{ textAlign: "right", paddingRight: 30 }}>
                    <Button color="primary" outline style={{ border: "none", fontSize: 12 }}
                        onClick={() => this.setState({ modalDetail: !this.state.modalDetail, detailTransaction: value.detail, transaction: value })}>
                        Detail Transactions
                    </Button>
                    <Button color="danger" style={{ fontSize: 12, marginLeft: 10 }} onClick={() => this.onBtnDiscard(value.idtransaction)} >Discard Order</Button>
                </div>
            </div>
        })
    }

    render() {
        console.log('transaction', this.props.transactions)
        console.log('ongoingtransaction', this.state.ongoingTransactions)
        return (
            <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                <ModalDetailTransaction
                    modalOpen={this.state.modalDetail}
                    btClose={() => this.setState({ modalDetail: !this.state.modalDetail })}
                    detailTransaction={this.state.detailTransaction}
                    transaction={this.state.transaction}
                />
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                    <p className='heading2 pb-2'>Transactions History</p>
                    <Tabs size='md' colorScheme='#231953'>
                        <>
                            <TabList style={{ marginBottom: 30 }}>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>All transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Ongoing transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Past transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Doctor's prescription transactions</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel className='p-4'>
                                    {this.printTransactions()}
                                    <div className='text-center'>
                                        {this.renderBtnAllPagination()}
                                    </div>
                                </TabPanel>
                                <TabPanel className='p-4'>
                                    {this.printOngoingTransactions()}
                                    <div className='text-center'>
                                        {this.renderBtnOngoingPagination()}
                                    </div>
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

const mapToProps = (state) => {
    return {
        transactions: state.transactionsReducer.transactions
    }
}

export default connect(mapToProps, { getTransactionsActions, keepAction })(HistoryTransaction);