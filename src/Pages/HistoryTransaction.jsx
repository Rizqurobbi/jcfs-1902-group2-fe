import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Badge, Button } from 'reactstrap';
import { getTransactionsActions } from '../redux/actions/transactionsAction';
import { connect } from 'react-redux';
import { API_URL } from '../helper';

class HistoryTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getTransactionsActions()
    }

    printTransactions = () => {
        return this.props.transactions.map((value, index) => {
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{value.date}</span>
                    <b style={{ marginLeft: 10 }}>{value.invoice}</b>
                    <Badge color='warning' style={{ float: 'right', fontSize: 16 }}>Ongoing</Badge>
                </div>
                <div className="row p-3">
                    <div className="col-md-2">
                        <img src='https://api.watsons.co.id/medias/zoom-front-10453.jpg?context=bWFzdGVyfGltYWdlc3wxMjM0MDd8aW1hZ2UvanBlZ3xoNDEvaDdjLzEwMTc2OTA1NjQyMDE0L1dUQ0lELTEwNDUzLWZyb250LmpwZ3xkNGZiYzhkNTYyMDc0ZWZiNDE1ZTNlMzZjN2VkZjViYWY0ZWM2ZjBjNGM1Yjg3ZTcwZTI3YTI0N2YzODM3NjUz' width="80%" />
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
                    <Button color="danger" style={{ fontSize: 12 }} >Discard Order</Button>
                    <Button color="primary" outline style={{ border: "none", fontSize: 12, marginLeft: 10 }}>
                        Detail Transactions
                    </Button>
                </div>
            </div>
        })
    }
    printPastTransactions = () => {
        return this.props.transactions.map((value, index) => {
            if (value.status == 'Completed') {
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
            }
        })
    }
    render() {
        // let badgeColor = value.status.includes("Batal") ? "danger" : "warning"
        console.log('transaction', this.props.transactions)
        return (
            <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                    <p className='heading2 pb-2'>Transactions History</p>
                    <Tabs size='md' colorScheme='#231953'>
                        <>
                            <TabList style={{ marginBottom: 30 }}>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Ongoing transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Past transactions</Tab>
                                <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Doctor's prescription transactions</Tab>
                            </TabList>
                            <TabPanels align='start'>
                                <TabPanel className='p-0'>
                                    {this.printTransactions()}
                                </TabPanel>
                                <TabPanel className='p-0'>
                                    {
                                        this.printPastTransactions()
                                    }
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

export default connect(mapToProps, { getTransactionsActions })(HistoryTransaction);