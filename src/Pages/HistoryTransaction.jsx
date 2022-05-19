import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge, Button } from 'reactstrap';
import { getTransactionsActions } from '../redux/actions/transactionsAction';
import { keepAction } from '../redux/actions/userAction';
import { connect } from 'react-redux';
import { API_URL } from '../helper';
import ModalDetailTransaction from '../Components/ModalDetailTransaction';
import ModalDetailPastTransaction from '../Components/ModalDetailPastTransaction';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';

class HistoryTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDetail: false,
            modalDetailPast: false,
            detailTransaction: [],
            transaction: {},
            ongoingTransactions: [],
            pastTransactions: [],
            doctorTransactions: [],
            pageAll: 1,
            pageOngoing: 1,
            pagePast: 1
        }
    }

    componentDidMount() {
        this.props.getTransactionsActions()
        this.getOngoingTransactions()
        this.getPastTransactions()
        this.getDoctorTransactions()
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

    getPastTransactions = async () => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/pastusertransactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    this.setState({
                        pastTransactions: res.data.dataTransaction
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getDoctorTransactions = async () => {
        try {
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(`${API_URL}/transactions/recipebyuser`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    this.setState({
                        doctorTransactions: res.data.dataRecipe
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

    renderBtnPastPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.pastTransactions.length / 4); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    style={{ border: 'none', marginRight: 5 }}
                    disabled={this.state.pagePast == i + 1 ? true : false}
                    onClick={() => this.setState({ pagePast: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    onBtnDiscard = async (idtransaction, detail) => {
        try {
            Swal.fire({
                title: 'Do you want to discard the transaction?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#3498db',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let token = localStorage.getItem('data')
                    if (token) {
                        let res = await axios.patch(`${API_URL}/transactions/discardtransaction`, { idtransaction: idtransaction, detail: detail }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (res.data.success) {
                            await Swal.fire({
                                title: '',
                                text: 'Discard Transaction success',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                            this.props.getTransactionsActions()
                            this.getOngoingTransactions()
                        }
                    }
                } else if (result.isDenied) {
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    onBtnDiscardRec = async (idtransaction, detail) => {
        try {
            Swal.fire({
                title: 'Do you want to discard the transaction?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#3498db',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let token = localStorage.getItem('data')
                    if (token) {
                        let res = await axios.patch(`${API_URL}/transactions/discardrectransaction`, { idtransaction: idtransaction, detail: detail }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (res.data.success) {
                            await Swal.fire({
                                title: '',
                                text: 'Discard Transaction success',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                            this.props.getTransactionsActions()
                            this.getOngoingTransactions()
                            this.getDoctorTransactions()
                        }
                    }
                } else if (result.isDenied) {
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    printTransactions = () => {
        let { pageAll } = this.state
        return this.props.transactions.slice(pageAll > 1 ? (pageAll - 1) * 4 : pageAll - 1, pageAll * 4).map((value, index) => {
            let badgeColor = value.status.includes("Waiting") ? "secondary" : value.status.includes("Process") ? "primary" :
                value.status.includes("Ongoing") ? "warning" : value.status.includes("Completed") ? "success" : "danger"
            let date = value.date
            let newDate = moment(date).format("LL")
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
                        <p className="text-muted mb-2" style={{ fontSize: 14 }}>{value.detail[0].qty} {value.detail[0].satuan} x Rp. {value.detail[0].harga.toLocaleString()}</p>
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
                                    onClick={() => this.setState({ modalDetailPast: !this.state.modalDetailPast, detailTransaction: value.detail, transaction: value })}>
                                    Detail Transactions
                                </Button>
                            </div> :
                            <div>
                                <Button color="primary" outline style={{ border: "none", fontSize: 12 }}
                                    onClick={() => this.setState({ modalDetail: !this.state.modalDetail, detailTransaction: value.detail, transaction: value })}>
                                    Detail Transactions
                                </Button>
                                {
                                    value.invoice.includes('REC') ?
                                        <Button color="danger" style={{ fontSize: 12, marginLeft: 10 }} onClick={() => this.onBtnDiscardRec(value.idtransaction, value.detail)}>Discard Order</Button>
                                        :
                                        <Button color="danger" style={{ fontSize: 12, marginLeft: 10 }} onClick={() => this.onBtnDiscard(value.idtransaction, value.detail)}>Discard Order</Button>
                                }
                            </div>
                    }
                </div>
            </div>
        })
    }

    printOngoingTransactions = () => {
        let { pageOngoing } = this.state
        return this.state.ongoingTransactions.slice(pageOngoing > 1 ? (pageOngoing - 1) * 4 : pageOngoing - 1, pageOngoing * 4).map((value, index) => {
            let badgeColor = value.status.includes("Waiting") ? "secondary" : value.status.includes("Process") ? "primary" :
                value.status.includes("Ongoing") ? "warning" : value.status.includes("Completed") ? "success" : "danger"
            let date = value.date
            let newDate = moment(date).format("LL")
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
                        <p className="text-muted mb-2" style={{ fontSize: 14 }}>{value.detail[0].qty} {value.detail[0].satuan} x Rp. {value.detail[0].harga.toLocaleString()}</p>
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
                    <Button color="danger" style={{ fontSize: 12, marginLeft: 10 }} onClick={() => this.onBtnDiscard(value.idtransaction, value.detail)} >Discard Order</Button>
                </div>
            </div>
        })
    }

    printPastTransactions = () => {
        let { pagePast } = this.state
        return this.state.pastTransactions.slice(pagePast > 1 ? (pagePast - 1) * 4 : pagePast - 1, pagePast * 4).map((value, index) => {
            let badgeColor = value.status.includes("Waiting") ? "secondary" : value.status.includes("Process") ? "primary" :
                value.status.includes("Ongoing") ? "warning" : value.status.includes("Completed") ? "success" : "danger"
            let date = value.date
            let newDate = moment(date).format("LL")
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
                        onClick={() => this.setState({ modalDetailPast: !this.state.modalDetailPast, detailTransaction: value.detail, transaction: value })}>
                        Detail Transactions
                    </Button>
                </div>
            </div>
        })
    }

    printDoctorTransactions = () => {
        return this.state.doctorTransactions.map((value, index) => {
            let badgeColor = value.status.includes("Process") ? "primary" : value.status.includes("Completed") ? "success" : value.status.includes("Waiting") ? "secondary" : "danger"
            let date = value.date
            let newDate = moment(date).format("LL")
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{newDate}</span>
                    <b style={{ marginLeft: 10 }}>{value.fullname}</b>
                    <Badge color={badgeColor} style={{ float: 'right', fontSize: 16 }}>{value.status}</Badge>
                </div>
                <div className="row py-3 px-5">
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <p style={{ marginRight: 40 }}>{index + 1}.</p>
                        <img src={API_URL + value.url} width="80%" />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <h4 style={{ fontWeight: "bolder", paddingLeft: 40 }}>{value.invoice}</h4>
                    </div>
                    <div className="col-md-2 d-flex align-items-center" style={{ float: "right" }}>
                        {
                            value.status.includes('Process') ?
                                <Button color="danger" style={{ fontSize: 16, width: "100%" }}
                                    onClick={() => this.onBtnDiscardRecipe(value.idresep)}
                                >Discard order
                                </Button> :
                                null
                        }
                    </div>
                </div>

            </div>
        })
    }
    onBtnDiscardRecipe = async (idresep) => {
        try {
            Swal.fire({
                title: 'Do you want to discard the transaction?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#3498db',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let token = localStorage.getItem('data')
                    if (token) {
                        let res = await axios.patch(`${API_URL}/transactions/discardstatusrecipe`, { idresep: idresep }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (res.data.success) {
                            await Swal.fire({
                                title: '',
                                text: 'Discard Success',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                            this.props.getTransactionsActions()
                            this.getDoctorTransactions()
                        }
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })


        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                <ModalDetailTransaction
                    modalOpen={this.state.modalDetail}
                    btClose={() => this.setState({ modalDetail: !this.state.modalDetail })}
                    detailTransaction={this.state.detailTransaction}
                    transaction={this.state.transaction}
                />
                <ModalDetailPastTransaction
                    modalOpen={this.state.modalDetailPast}
                    btClose={() => this.setState({ modalDetailPast: !this.state.modalDetailPast })}
                    detailTransaction={this.state.detailTransaction}
                    transaction={this.state.transaction}
                />
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                    <p className='heading2 pb-4'>Transactions History</p>
                    <Tabs size='md' colorScheme='#231953'>
                        <>
                            <TabList style={{ marginBottom: 30 }}>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>All transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Ongoing transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Past transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Doctor's prescription transactions</Tab>
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
                                <TabPanel className='p-4'>
                                    {
                                        this.state.pastTransactions ?
                                            <div>
                                                {this.printPastTransactions()}
                                                <div className='text-center'>
                                                    {this.renderBtnPastPagination()}
                                                </div>
                                            </div> :
                                            null
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {this.printDoctorTransactions()}
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