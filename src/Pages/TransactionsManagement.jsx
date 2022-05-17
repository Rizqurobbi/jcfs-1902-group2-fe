import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios';
import { API_URL } from '../helper';
import { Button, Badge, Input, InputGroup } from 'reactstrap';
import ModalAddRecipe from '../Components/ModalOrderRecipe';
import ModalDetailTransactionManagement from '../Components/ModalDetailTransactionManagement';
import { getTransactionsActions } from '../redux/actions/transactionsAction';
import { connect } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';


class TransactionManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTransactionsList: [],
            ongoingTransactionsList: [],
            pastTransactionsList: [],
            modalOpenDetail: false,
            detailTransaction: [],
            transaction: [],
            pageAll: 1,
            pageOngoing: 1,
            pagePast: 1,
            recipe: [],
            modalAdd: false,
            detailRecipe: {}
        }
    }

    componentDidMount() {
        this.getUserRecipe()
        this.getAllTransactionsAdmin()
        this.getOngoingTransactionsAdmin()
        this.getPastTransactionsAdmin()
    }

    getUserRecipe = () => {
        let token = localStorage.getItem('data')
        axios.get(`${API_URL}/transactions/recipe`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success) {
                this.setState({
                    recipe: res.data.dataRecipe
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    getAllTransactionsAdmin = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (token) {
            if (search) {
                if (search.inFilter) {
                    if (search.inDateStart && search.inDateEnd) {
                        res = axios.get(`${API_URL}/transactions/adminalltransactions?invoice=${search.inFilter}&start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ allTransactionsList: res.data.dataTransactionAdmin, pageAll: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        res = axios.get(`${API_URL}/transactions/adminalltransactions?invoice=${search.inFilter}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ allTransactionsList: res.data.dataTransactionAdmin, pageAll: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }

                } else {
                    res = axios.get(`${API_URL}/transactions/adminalltransactions?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            this.setState({ allTransactionsList: res.data.dataTransactionAdmin, pageAll: 1 })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            } else {
                res = axios.get(`${API_URL}/transactions/adminalltransactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        this.setState({ allTransactionsList: res.data.dataTransactionAdmin, pageAll: 1 })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
    getOngoingTransactionsAdmin = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (token) {
            if (search) {
                if (search.inFilter) {
                    if (search.inDateStart && search.inDateEnd) {
                        res = axios.get(`${API_URL}/transactions/adminongoingtransactions?invoice=${search.inFilter}&start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ ongoingTransactionsList: res.data.dataTransactionAdmin, pageOngoing: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        res = axios.get(`${API_URL}/transactions/adminongoingtransactions?invoice=${search.inFilter}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ ongoingTransactionsList: res.data.dataTransactionAdmin, pageOngoing: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    res = axios.get(`${API_URL}/transactions/adminongoingtransactions?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            this.setState({ ongoingTransactionsList: res.data.dataTransactionAdmin, pageOngoing: 1 })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            } else {
                res = axios.get(`${API_URL}/transactions/adminongoingtransactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        this.setState({ ongoingTransactionsList: res.data.dataTransactionAdmin, pageOngoing: 1 })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
    getPastTransactionsAdmin = (search = null) => {
        let token = localStorage.getItem('data')
        let res;
        if (token) {
            if (search) {
                if (search.inFilter) {
                    if (search.inDateStart && search.inDateEnd) {
                        res = axios.get(`${API_URL}/transactions/adminpasttransactions?invoice=${search.inFilter}&start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ pastTransactionsList: res.data.dataTransactionAdmin, pagePast: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        res = axios.get(`${API_URL}/transactions/adminpasttransactions?invoice=${search.inFilter}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then((res) => {
                                this.setState({ pastTransactionsList: res.data.dataTransactionAdmin, pagePast: 1 })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    res = axios.get(`${API_URL}/transactions/adminpasttransactions?start_date=${search.inDateStart}&end_date=${search.inDateEnd}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            this.setState({ pastTransactionsList: res.data.dataTransactionAdmin, pagePast: 1 })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            } else {
                res = axios.get(`${API_URL}/transactions/adminpasttransactions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        this.setState({ pastTransactionsList: res.data.dataTransactionAdmin, pagePast: 1 })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }

    printAllTransactionList = () => {
        let { allTransactionsList, pageAll } = this.state
        return allTransactionsList.slice(pageAll > 1 ? (pageAll - 1) * 3 : pageAll - 1, pageAll * 3).map((value, index) => {
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
    printFilterAll = () => {
        return (
            <InputGroup style={{ width: '300px', height: '30px' }}>
                <Input type='text' placeholder='Search Invoice Or Username' innerRef={(e) => this.inFilterAll = e} onChange={this.handleInputAll}>
                </Input>
            </InputGroup>
        )
    }
    handleInputAll = () => {
        if (this.inFilterAll.value === '') {
            this.getAllTransactionsAdmin()
        } else {
            this.getAllTransactionsAdmin({
                inFilter: this.inFilterAll.value,
                inDateStart: this.inDateStartAll.value,
                inDateEnd: this.inDateEndAll.value,
            })
        }
    }
    printFilterDateAll = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartAll = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndAll = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px', borderRadius: 10 }} onClick={this.btnResetAll}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px', borderRadius: 10 }} onClick={this.handleDateAll}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    handleDateAll = () => {
        this.getAllTransactionsAdmin({
            inDateStart: this.inDateStartAll.value,
            inDateEnd: this.inDateEndAll.value,
        })
    }
    btnResetAll = () => {
        this.inDateStartAll.value = ''
        this.inDateEndAll.value = ''
        this.inFilterAll.value = ''
        this.getAllTransactionsAdmin()
    }
    printOngoingTransactionList = () => {
        let { ongoingTransactionsList, pageOngoing } = this.state
        return ongoingTransactionsList.slice(pageOngoing > 1 ? (pageOngoing - 1) * 3 : pageOngoing - 1, pageOngoing * 3).map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Ongoing") ? "warning" : value.status.includes("Waiting") ? 'secondary' : value.status.includes("Process") ? 'info' : 'danger'
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
    printFilterOngoing = () => {
        return (
            <InputGroup style={{ width: '300px', height: '30px' }}>
                <Input type='text' placeholder='Search Invoice Or Username' innerRef={(e) => this.inFilterOngoing = e} onChange={this.handleInputOngoing}>
                </Input>
            </InputGroup>
        )
    }
    handleInputOngoing = () => {
        if (this.inFilterOngoing.value === '') {
            this.getOngoingTransactionsAdmin()
        } else {
            this.getOngoingTransactionsAdmin({
                inFilter: this.inFilterOngoing.value,
                inDateStart: this.inDateStartOngoing.value,
                inDateEnd: this.inDateEndOngoing.value,
            })
        }
    }
    printFilterDateOngoing = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartOngoing = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndOngoing = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px' }} onClick={this.btnResetOngoing}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px' }} onClick={this.handleDateOngoing}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    handleDateOngoing = () => {
        this.getOngoingTransactionsAdmin({
            inDateStart: this.inDateStartOngoing.value,
            inDateEnd: this.inDateEndOngoing.value,
        })
    }
    btnResetOngoing = () => {
        this.inDateStartOngoing.value = ''
        this.inDateEndOngoing.value = ''
        this.inFilterOngoing.value = ''
        this.getOngoingTransactionsAdmin()
    }
    printPastTransactionList = () => {
        let { pastTransactionsList, pagePast } = this.state
        return pastTransactionsList.slice(pagePast > 1 ? (pagePast - 1) * 3 : pagePast - 1, pagePast * 3).map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Completed") ? "success" : "danger"
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
    printFilterPast = () => {
        return (
            <InputGroup style={{ width: '300px', height: '30px' }}>
                <Input type='text' placeholder='Search Invoice Or Username' innerRef={(e) => this.inFilterPast = e} onChange={this.handleInputPast}>
                </Input>
            </InputGroup>
        )
    }
    handleInputPast = () => {
        if (this.inFilterPast.value === '') {
            this.getPastTransactionsAdmin()
        } else {
            this.getPastTransactionsAdmin({
                inFilter: this.inFilterPast.value,
                inDateStart: this.inDateStartPast.value,
                inDateEnd: this.inDateEndPast.value,
            })
        }
    }
    printFilterDatePast = () => {
        return (
            <div>
                <InputGroup style={{ width: '500px', marginLeft: 'auto', marginBottom: 24 }}>
                    <Input style={{ marginRight: '10px' }} type='date' innerRef={(e) => this.inDateStartPast = e}>
                    </Input>
                    <p style={{ alignSelf: 'center', fontSize: 20 }}>To</p>
                    <Input style={{ marginLeft: '10px' }} type='date' innerRef={(e) => this.inDateEndPast = e}>
                    </Input>
                    <Button className='landing1' style={{ border: 'none', marginLeft: '10px' }} onClick={this.btnResetPast}>
                        Reset
                    </Button>
                    <Button className='NavbarButton' style={{ border: 'none', marginLeft: '10px' }} onClick={this.handleDatePast}>
                        Filter
                    </Button>
                </InputGroup>
            </div>
        )
    }
    handleDatePast = () => {
        this.getPastTransactionsAdmin({
            inDateStart: this.inDateStartPast.value,
            inDateEnd: this.inDateEndPast.value,
        })
    }
    btnResetPast = () => {
        this.inDateStartPast.value = ''
        this.inDateEndPast.value = ''
        this.inFilterPast.value = ''
        this.getPastTransactionsAdmin()
    }
    printBtnPaginationAll = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.allTransactionsList.length / 3); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
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
        for (let i = 0; i < Math.ceil(this.state.ongoingTransactionsList.length / 3); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
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
        for (let i = 0; i < Math.ceil(this.state.pastTransactionsList.length / 3); i++) {
            btn.push(
                <Button
                    style={{ border: "none", marginRight: 5 }}
                    className='NavbarButton'
                    disabled={this.state.pagePast == i + 1 ? true : false}
                    onClick={() => this.setState({ pagePast: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    onBtArrangeOrder = (value) => {
        axios.patch(`${API_URL}/transactions/editstatusrecipe`, { idresep: value.idresep })
            .then(res => {
                if (res.data.success) {
                    this.setState({ modalAdd: !this.state.modalAdd, detailRecipe: value })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    onBtDiscardOrder = (idresep) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#3498db',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${API_URL}/transactions/discardstatusrecipe`, { idresep: idresep })
                    .then(res => {
                        if (res.data.success) {
                            this.getUserRecipe()
                        }
                    }).catch(error => {
                        console.log(error)
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    printUserRecipe = () => {
        return this.state.recipe.map((value, index) => {
            let newDate = moment(value.date).format('LLL')
            let badgeColor = value.status.includes("Cancel") ? "danger" : value.status.includes("Process") ? "primary" : "warning"
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{newDate}</span>
                    <b style={{ marginLeft: 10 }}>{value.username}</b>
                    <Badge color={badgeColor} style={{ float: 'right', fontSize: 16 }}>{value.status}</Badge>
                </div>
                <div className="row py-3 px-5">
                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                        <p style={{ marginRight: 40 }}>{index + 1}.</p>
                        <img src={API_URL + value.url} width="80%" />
                    </div>
                    <div className="col-md-5 d-flex flex-column justify-content-center">
                        <h4 style={{ fontWeight: "bolder", paddingLeft: 40 }}>{value.invoice}</h4>
                    </div>
                    <div className="col-md-4 d-flex align-items-center" style={{ textAlign: "right", paddingRight: 30 }}>
                        <Button color="primary" style={{ fontSize: 16, width: "100%", marginRight: 20 }}
                            onClick={() => this.setState({ modalAdd: !this.state.modalAdd, detailRecipe: value })}
                        >Arrange order</Button>
                        <Button color="danger" style={{ fontSize: 16, width: "100%" }}
                            onClick={() => this.onBtDiscardOrder(value.idresep)}
                        >Discard order</Button>
                    </div>
                </div>

            </div>
        })
    }

    render() {
        return (
            <div>
                <ModalAddRecipe
                    modalOpen={this.state.modalAdd}
                    btClose={() => this.setState({ modalAdd: !this.state.modalAdd })}
                    detailRecipe={this.state.detailRecipe}
                />
                <ModalDetailTransactionManagement
                    modalOpen={this.state.modalOpenDetail}
                    detailTransaction={this.state.detailTransaction}
                    transaction={this.state.transaction}
                    btClose={() => this.setState({ modalOpenDetail: !this.state.modalOpenDetail })}
                />
                <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                    <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                        <p className='heading2 pb-4'>User's Transactions History</p>
                        <Tabs size='md' colorScheme='#231953'>
                            <>
                                <TabList style={{ marginBottom: 30 }}>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>All transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Ongoing transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Past transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10, fontSize: 18 }}>Doctor's prescription transactions</Tab>
                                </TabList>
                                <TabPanels align='start'>
                                    <TabPanel className='p-0'>
                                        <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                            {this.printFilterAll()}
                                            {this.printFilterDateAll()}
                                        </div>
                                        {this.printAllTransactionList()}
                                        <div className="text-center">
                                            {this.printBtnPaginationAll()}
                                        </div>
                                    </TabPanel>
                                    <TabPanel className='p-0'>
                                        <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                            {this.printFilterOngoing()}
                                            {this.printFilterDateOngoing()}
                                        </div>
                                        {this.printOngoingTransactionList()}
                                        <div className="text-center">
                                            {this.printBtnPaginationOngoing()}
                                        </div>
                                    </TabPanel>
                                    <TabPanel className='p-0'>
                                        <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                            {this.printFilterPast()}
                                            {this.printFilterDatePast()}
                                        </div>
                                        {this.printPastTransactionList()}
                                        <div className="text-center">
                                            {this.printBtnPaginationPast()}
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        {this.printUserRecipe()}
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

const mapToProps = (state) => {
    return {
        transactions: state.transactionsReducer.transactions
    }
}

export default connect(mapToProps, { getTransactionsActions })(TransactionManagement);