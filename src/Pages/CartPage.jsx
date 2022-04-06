import React from 'react';
import { connect } from 'react-redux';
import { getCartAction } from '../redux/actions';
import { Button, Input } from 'reactstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai'
import cartmedicine from '../img/cartmedicine.png'
import { FiEdit, FiUpload, FiTrash2 } from "react-icons/fi";
import { API_URL } from '../helper';
import { IoRemoveCircleOutline, IoAddCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5";
class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1
        }
    }
    componentDidMount() {
        this.props.getCartAction()
    }
    btnIncrement = (index) => {
        let temp = [...this.props.carts]
        if (temp[index].qty < temp[index].stock_qty) {
            temp[index].qty += 1
            this.setState({ coonter: this.state.counter })
        }else{
            alert(`Hai`)
        }
    }
    btnDecrement = (num) => {
        if (this.state.counter > 1) {

            this.state.counter -= num
            this.setState({
                counter: this.state.counter
            })
        }
    }
    printCart = () => {
        return this.props.carts.map((value, index) => {
            return (
                <div className='row' style={{ height: '22vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: 15, marginBottom: '20px', background: 'white' }}>
                    <div className='col-4' style={{ width: '30%' }}>
                        <img src={API_URL + value.url} style={{ width: '100%', height: '100%' }} alt="" />
                    </div>
                    <div className='col-5 p-4' style={{}}>
                        <p className='heading3' style={{ fontSize: 28 }}>{value.nama}</p>
                        <p>Category: {value.category}</p>
                    </div>
                    <div className='col-3'>
                        <div>
                            <p className='heading3' style={{ marginTop: 27, fontSize: 25 }}>Rp.{value.harga.toLocaleString()}</p>
                            <p style={{ marginTop: -10 }}>{value.berat}{value.satuan}</p>
                        </div>
                        <div className="d-flex" style={{ marginTop: 20 }}>
                            <IoRemoveCircleOutline style={{ fontSize: 30, marginTop: 5,color:'#1E144F' }} />
                            <Input style={{ width: 45, border: 'none', textAlign: 'center' }} value={value.qty}></Input>
                            <IoAddCircleOutline style={{ fontSize: 30, marginTop: 5,color:'#1E144F' }} />
                            <span title='Remove Product' style={{ fontSize: 29, color: '#E63E54', marginTop: 5, marginLeft: 15 }}><FiTrash2 /></span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        console.log('hai', this.props.carts)
        return (
            <div className='container-fluid' style={{ background: '#F6F7FB' }}>
                <div className='container'>
                    <div className='container p-4'>
                        <div style={{ backgroundPosition: '20% 30%', backgroundSize: 'cover', backgroundImage: `url('${cartmedicine}')`, backgroundRepeat: 'no-repeat', width: '100%', height: '40vh', borderRadius: '15px' }}>
                            <div style={{ paddingTop: '13vh', paddingLeft: '860px' }}>
                                <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Carts</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-7 p-4'>
                                {this.printCart()}
                            </div>
                            <div className='col-5 p-4'>
                                <div style={{ borderRadius: 10, background: 'white', height: 500, width: 340, marginLeft:'auto' ,padding: 23, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <div>
                                        <p className='heading3' style={{ fontSize: '' }}>ORDER SUMMARY</p>
                                    </div>
                                    <div style={{ height: '36vh', margin: 10 }}>
                                        <p>HALO</p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Button style={{ width: 200, height: 50 }} className='NavbarButton'>CHECKOUT</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        carts: state.transactionsReducer.carts
    }
}
export default connect(mapToProps, { getCartAction })(CartPage)