import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col, Table, ButtonGroup } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';
import ModalAdd from '../Components/ModalAdd';
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdMoreHoriz } from "react-icons/md";
import { FiEdit, FiUpload, FiTrash2 } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import ModalEdit from '../Components/ModalEdit';
import PM from '../img/productsManagement2.jpg'

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: [],
            page: 1,
            productDetail: {},
            modalOpenAdd: false,
            modalOpenEdit: false,
        }
    }
    componentDidMount() {
        this.props.getProductAction()
    }
    // render element input form image
    deleteProduct = (id) => {
        axios.delete(`${API_URL}/products/${id}`)
            .then((res) => {
                this.props.getProductAction()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    printProduct = () => {
        let { page } = this.state
        return this.props.products.slice(page > 1 ? (page - 1) * 5 : page - 1, page * 5).map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td style={{ width: '13%' }}>
                        <img src={value.images[0].url.includes('http') ? value.images[0].url : API_URL + value.images[0].url} style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt="" />
                    </td>
                    <td style={{ paddingTop: 42 }}><p className='heading3'>{value.nama}</p></td>
                    <td style={{ paddingTop: 50 }}><p className='heading3' style={{ fontSize: 15 }}>{value.stocks[1].qty}</p></td>
                    <td style={{ paddingTop: 50 }}><p className='heading3' style={{ fontSize: 15 }}>{value.stocks[2].satuan}</p></td>
                    <td style={{ paddingTop: 50 }}><p className='heading3' style={{ fontSize: 15 }}>{value.category}</p></td>
                    <td style={{ paddingTop: 50 }}><p className='heading3' style={{ fontSize: 15 }}>Rp.{value.harga.toLocaleString()}</p></td>
                    <td style={{ paddingTop: 50 }}>
                        <div className='d-flex' style={{ justifyContent: 'space-evenly' }}>
                            {/* <span title='Add Product' style={{ fontSize: 25 }} onClick={() => this.setState({ modalOpenAdd: !this.state.modalOpenAdd })}><CgAddR /></span> */}
                            <span title='Remove Product' style={{ fontSize: 25, color: '#E63E54' }} onClick={() => this.deleteProduct(value.idproduct)}><FiTrash2 /></span>
                            <span title='Edit Product' style={{ fontSize: 25, }} onClick={() => this.setState({ modalOpenEdit: !this.state.modalOpenEdit, productDetail: value })}><FiEdit /></span>
                        </div>
                    </td>
                </tr>
            )
        })
    }
    printBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.products.length / 5); i++) {
            btn.push(
                <button
                    className='NavbarButton'
                    disabled={this.state.page == i + 1 ? true : false}
                    onClick={() => this.setState({ page: i + 1 })}
                    style={{ borderRadius: '8px' }}
                >{i + 1}
                </button>
            )
        }
        return btn;
    }
    render() {
        return (
            <div className='container-fluid'>
                <div className='container'>
                    <div style={{ backgroundPosition: '20% 30%', backgroundSize: 'cover', backgroundImage: "url(" + PM + ")", backgroundRepeat: 'no-repeat', width: '100%', height: '40vh', borderRadius: '15px' }}>
                        <div style={{ paddingTop: '13vh', paddingLeft: '260px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Products Management</h1>
                        </div>
                       
                    </div>
                    <div className='d-flex' style={{marginTop:'2vh',marginLeft:'57vw'}}>
                            <p className='heading4' style={{marginTop:'1vh', fontWeight: 900,fontSize:18}}>ADD PRODUCT</p>
                            <div style={{ marginLeft: '1vw', height: '40px', backgroundColor: 'lightgreen', width: '40px', borderRadius: 800 }}>
                                <IoAddCircleOutline title='Add Product' onClick={() => this.setState({ modalOpenAdd: !this.state.modalOpenAdd })} style={{fontSize:40,cursor:'pointer'}}/>
                            </div>
                        </div>
                    <div style={{ marginTop: 20 }}>
                        <Table bordered style={{ textAlign: 'center', }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Weight</th>
                                    <th>Unit</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printProduct()}
                            </tbody>
                        </Table>
                        <div className="my-5 text-center">
                            <ButtonGroup>
                                {this.printBtnPagination()}
                            </ButtonGroup>
                        </div>
                    </div>

                </div>
                <ModalAdd
                    modalOpen={this.state.modalOpenAdd}
                    btClose={() => this.setState({ modalOpenAdd: !this.state.modalOpenAdd })} />
                <ModalEdit
                    modalOpen={this.state.modalOpenEdit}
                    btClose={() => this.setState({ modalOpenEdit: !this.state.modalOpenEdit })}
                    productDetail={this.state.productDetail} />
            </div>
        );
    }
}
const mapToProps = (state) => {
    return {
        category: state.productsReducer.category,
        unit: state.productsReducer.unit,
        products: state.productsReducer.products
    }
}
export default connect(mapToProps, { getProductAction })(ProductManagement)