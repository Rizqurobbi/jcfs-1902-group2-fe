import React, { Component } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios';
import { API_URL } from '../helper';
import { Button, Badge } from 'reactstrap';
import ModalAddRecipe from '../Components/ModalOrderRecipe';
import { getTransactionsActions } from '../redux/actions/transactionsAction';
import { connect } from 'react-redux';

class TransactionManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
            modalAdd: false,
            detailRecipe: {}
        }
    }

    componentDidMount() {
        this.getUserRecipe()
    }

    getUserRecipe = () => {
        let token = localStorage.getItem('data')
        axios.get(`${API_URL}/transactions/recipe`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.success) {
                console.log('tes', res.data.dataRecipe)
                this.setState({
                    recipe: res.data.dataRecipe
                })
            }
        }).catch(error => {
            console.log(error)
        })
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

    onBtDiscardOrder = (value) => {
        axios.patch(`${API_URL}/transactions/discardstatusrecipe`, { idresep: value.idresep })
            .then(res => {
                if (res.data.success) {
                    this.setState({ modalAdd: !this.state.modalAdd, detailRecipe: value })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    printUserRecipe = () => {
        return this.state.recipe.map((value, index) => {
            let badgeColor = value.status.includes("Cancel") ? "danger" : value.status.includes("Process") ? "primary" : "warning"
            return <div className="shadow pb-3 mb-4 heading4" style={{ borderRadius: 40 }}>
                <div className="py-3 px-5 NavbarButton" style={{ color: "white", borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                    <span>{value.date.substr(0, 10)}</span>
                    <b style={{ marginLeft: 10 }}>{value.fullname}</b>
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
                            onClick={() => this.onBtArrangeOrder(value)}
                        >Arrange order</Button>
                        <Button color="danger" style={{ fontSize: 16, width: "100%" }}
                            onClick={() => this.onBtDiscardOrder(value)}
                        >Discard order</Button>
                    </div>
                </div>

            </div>
        })
    }

    render() {
        console.log('detil resep', this.state.detailRecipe)
        console.log('transaksi user', this.props.transactions)
        console.log('transaksi semua user', this.state.recipe)
        return (
            <div>
                <ModalAddRecipe
                    modalOpen={this.state.modalAdd}
                    btClose={() => this.setState({ modalAdd: !this.state.modalAdd })}
                    detailRecipe={this.state.detailRecipe}
                />
                <div className='container-fluid pt-4' style={{ backgroundColor: '#FCFBFA', paddingBottom: 50 }} >
                    <div className='container shadow px-5' style={{ backgroundColor: 'white', borderRadius: 50, paddingTop: 40, paddingBottom: 40 }}>
                        <p className='heading2 pb-2'>User's Transactions History</p>
                        <Tabs size='md' colorScheme='#231953'>
                            <>
                                <TabList style={{ marginBottom: 30 }}>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>All transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Ongoing transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Past transactions</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Doctor's prescription transactions</Tab>
                                </TabList>
                                <TabPanels align='start'>
                                    <TabPanel className='p-0'>

                                    </TabPanel>
                                    <TabPanel>

                                    </TabPanel>
                                    <TabPanel>

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