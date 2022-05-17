import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';
import Swal from 'sweetalert2';
import moment from 'moment';


class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }
    componentDidMount() {
        this.props.getProductAction()
    }
    btnUpload = () => {
        let formData = new FormData()
        let data = {
            idcategory: this.inCategory.value,
            nama: this.inName.value,
            harga: this.inPrice.value,
            deskripsi: this.inDesc.value,
            penyajian: this.inServ.value,
            dosis: this.inDose.value,
            caraPenyimpanan: this.inKeep.value,
            kegunaan: this.inBenefit.value,
            komposisi: this.inCompos.value,
            idunit: this.inUnit.value,
            qty: this.inQty.value,
            date: moment().format('YYYY-MM-DD'),
            efekSamping: this.inSide.value,
            stocks: [
                {
                    idunit: this.inUnit.value,
                    qty: this.inQty.value,
                    isnetto: 0
                },
                {
                    idunit: this.inNettoUnit.value,
                    qty: this.inNettoQty.value,
                    isnetto: 1
                },
                {
                    idunit: this.inNettoUnit.value,
                    qty: this.inQty.value * this.inNettoQty.value,
                    isnetto: 0
                }
            ]
        }
        if (data.idcategory == 0 || data.nama== '' || data.harga == null || data.deskripsi == '' || data.penyajian == '' || data.dosis == '' || data.caraPenyimpanan == '' || data.kegunaan == '' || data.komposisi == '' || data.idunit == 0 || data.qty == null || data.efekSamping == '' || data.stocks[1].idunit == 0 || data.stocks[1].qty == null || this.state.images.length==0) {
            Swal.fire({
                title: 'You have a blank form!',
                text: 'You have to fill all the form',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        } else {
            formData.append(`data`, JSON.stringify(data))
            this.state.images.forEach(val => formData.append('Images', val.file))
            axios.post(API_URL + '/products', formData)
                .then(res => {
                    if (res) {
                        this.props.btClose()
                        this.setState({ images: [] })
                        Swal.fire({
                            title: 'Yeay!',
                            text: 'Add product success',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        this.props.getProductAction()
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    }
    onBtAddImages = () => {
        if (this.state.images.length < 1) {
            this.state.images.push("")
            this.setState({ images: this.state.images })
        } else {
            alert(`As For Now Admin can only input 1 image per product`)
        }
    }
    onBtDeleteStock = (index) => {
        this.state.stocks.splice(index, 1)
        this.setState({ stocks: this.state.stocks })
    }

    onBtDeleteImage = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.images })
    }
    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((value, index) => {
                return <Row>
                    <Col>
                        <Input style={{ width: '10vw' }} accept="image/*" type="file" placeholder={`Select Images-${index + 1}`}
                            onChange={(e) => this.handleImages(e, index)} />
                        {
                            value.file ?
                                <img src={URL.createObjectURL(value.file)} style={{ width: '60%', marginTop: 20, marginBottom: 20 }} />
                                :
                                <img src='http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg' style={{ width: '60%', marginTop: 20, marginBottom: 20 }} />
                        }
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }
    handleImages = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.state.images]
        temp[index] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.state.stocks]
        temp[index].type = e.target.value;
        this.setState({ stocks: temp })
    }

    handleStock = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.state.stocks]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }
    handleUnit = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.state.stocks]
        temp[index].qty = e.target.value
        this.setState({ stocks: temp })
    }
    onBtCancel = () => {
        this.setState({ stocks: [], images: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }
    render() {
        console.log(this.props.unit)
        return (
            <div>
                <Modal
                    centered
                    fullscreen="sm"
                    size="lg"
                    toggle={this.props.btClose}
                    isOpen={this.props.modalOpen}
                >
                    <ModalHeader toggle={this.props.btClose}>
                        <p className='heading3' style={{ marginLeft: '16vw', marginTop: '10px' }}>Add Product</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6'>
                                <FormGroup>
                                    <Label>Product Name</Label>
                                    <Input type='text' innerRef={e => this.inName = e}></Input>
                                </FormGroup>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Price</Label>
                                            <Input type='number' innerRef={e => this.inPrice = e}></Input>
                                        </FormGroup>
                                    </div>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Category</Label>
                                            <Input type='select' innerRef={e => this.inCategory = e}>
                                                <option value={0}>Category</option>
                                                {
                                                    this.props.category.map((value, index) => <option value={value.idcategory} key={value.idcategory}>{value.category}</option>)
                                                }
                                            </Input>
                                        </FormGroup>
                                    </div>
                                </div>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input type='textarea' innerRef={e => this.inDesc = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Serving Method</Label>
                                    <Input type='text' innerRef={e => this.inServ = e}></Input>
                                </FormGroup>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Stocks</Label>
                                            <div className='d-flex'>
                                                <Input style={{ marginRight: '5px' }} type="number" placeholder={`Qty`} innerRef={e => this.inQty = e} />
                                                <Input type='select'
                                                    innerRef={e => this.inUnit = e}>
                                                    <option value={0}>Unit</option>
                                                    {
                                                        this.props.unit.map((val, index) => <option value={val.idunit} key={val.idunit}>{val.satuan}</option>)
                                                    }
                                                </Input>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Netto/Stock</Label>
                                            <div className="d-flex">
                                                <Input style={{ marginRight: '5px' }} type="number" placeholder={`Qty`} innerRef={e => this.inNettoQty = e} />
                                                <Input type='select'
                                                    innerRef={e => this.inNettoUnit = e}>
                                                    <option value={0}>Unit</option>
                                                    {
                                                        this.props.unit.map((val, index) => <option value={val.idunit} key={val.idunit}>{val.satuan}</option>)
                                                    }
                                                </Input>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6'>
                                <FormGroup>
                                    <Label>Dose</Label>
                                    <Input type='textarea' innerRef={e => this.inDose = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>How to Keep</Label>
                                    <Input type='text' innerRef={e => this.inKeep = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Benefit</Label>
                                    <Input type='text' innerRef={e => this.inBenefit = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Composition</Label>
                                    <Input type='text' innerRef={e => this.inCompos = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Cautions</Label>
                                    <Input type='text' innerRef={e => this.inSide = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Images</Label>
                                    <button type="button" size="sm" style={{ float: 'right', margin: 'auto' }} className='landing1' onClick={this.onBtAddImages}>CLICK</button>
                                    {this.printImages()}
                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className='NavbarButton py-1'
                            onClick={() => this.btnUpload()}
                        >
                            UPLOAD
                        </button>
                        <button className='landing1 py-1' onClick={this.props.btClose}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapToProps, { getProductAction })(ModalAdd);