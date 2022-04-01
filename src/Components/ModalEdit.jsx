import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: [''],
            edit: false
        }
    }
    // componentDidMount() {
    //     this.props.getProductAction()
    // }
    btnSave = () => {
        let formData = new FormData()
        let data = {
            idcategory: this.inCategory.value,
            idunit: this.inUnit.value,
            nama: this.inName.value,
            berat: this.inWeight.value,
            harga: this.inPrice.value,
            deskripsi: this.inDesc.value,
            penyajian: this.inServ.value,
            dosis: this.inDose.value,
            caraPenyimpanan: this.inKeep.value,
            kegunaan: this.inBenefit.value,
            komposisi: this.inCompos.value,
            efekSamping: this.inSide.value,
            stocks: this.state.stocks
        }
        formData.append(`data`, JSON.stringify(data))
        this.state.images.forEach(val => formData.append('Images', val.file))
        console.log(data)
        this.props.btClose()
        axios.patch(`${API_URL}/products/${this.props.productDetail.idproduct}`, formData)
            .then(res => {
                console.log(res.data)
                this.props.getProductAction()
                this.setState({ edit: false })
                alert('Edit Product Success')
            }).catch(err => {
                console.log(err)
            })

    }
    printStock = () => {
        if (this.props.productDetail.stocks) {
            return this.props.productDetail.stocks.map((value, index) => {
                return <Row>
                    <Col>
                        <Input disabled={!this.state.edit} defaultValue={value.type} type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input disabled={!this.state.edit} defaultValue={value.qty} type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                </Row>
            })
        }
    }
    handleImages = (e, index) => {
        console.log(this.state.images)
        let temp = [...this.state.images]
        temp[index] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({ images: temp })
    }
    printImages = () => {
        if (this.props.productDetail.images) {

            return this.props.productDetail.images.map((value, index) => {
                return <Row>
                    <Col>
                        <Input disabled={!this.state.edit} style={{ width: 'auto' }} accept="image/*" type="file"
                            onChange={(e) => this.handleImages(e, index)} />
                        {
                            this.state.images[0] ?
                                <img src={URL.createObjectURL(this.state.images[0].file)} style={{ width: '40%', marginTop: 20, marginBottom: 20 }} />
                                :
                                <img src={value.url} style={{ width: '40%', marginTop: 20, marginBottom: 20, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px' }} />
                        }
                    </Col>

                </Row>
            })
        }
    }
    handleType = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.props.productDetail.stocks]
        temp[index].type = e.target.value;
        this.setState({ stocks: temp })
    }

    handleStock = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.props.productDetail.stocks]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }
    render() {
        let { idunit, idcategory, nama, satuan, category, berat, harga, deskripsi, penyajian, dosis, caraPenyimpanan, kegunaan, komposisi, efekSamping } = this.props.productDetail
        return (
            <div>
                <Modal
                    centered
                    fullscreen="sm"
                    size="lg"
                    isOpen={this.props.modalOpen}
                >
                    <ModalHeader toggle={this.props.btClose}>
                        <p className='heading3' style={{ marginLeft: '20.6vw', marginTop: '10px' }}>Edit Product</p>
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6'>
                                <FormGroup>
                                    <Label>Product Name</Label>
                                    <Input disabled={!this.state.edit} defaultValue={nama} type='text' innerRef={e => this.inName = e}></Input>
                                </FormGroup>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Price</Label>
                                            <Input disabled={!this.state.edit} defaultValue={harga} type='Number' innerRef={e => this.inPrice = e}></Input>
                                        </FormGroup>
                                    </div>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Unit</Label>
                                            <Input type='select'
                                                disabled={!this.state.edit}
                                                innerRef={e => this.inUnit = e}>
                                                <option value={idunit}>{satuan}</option>
                                                {
                                                    this.props.unit.map((value, index) => <option value={value.idunit} key={value.idunit}>{value.satuan}</option>)
                                                }
                                            </Input>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Category</Label>
                                            <Input type='select' innerRef={e => this.inCategory = e}
                                                disabled={!this.state.edit}>
                                                <option value={idcategory}>{category}</option>
                                                {
                                                    this.props.category.map((value, index) => <option value={value.idcategory} key={value.idcategory}>{value.category}</option>)
                                                }
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label>Weight</Label>
                                            <Input disabled={!this.state.edit} defaultValue={berat} type='Number' innerRef={e => this.inWeight = e}></Input>
                                        </FormGroup>
                                    </div>
                                </div>
                                <FormGroup>
                                    <Label>Description</Label>
                                    <Input disabled={!this.state.edit} defaultValue={deskripsi} type='textarea' innerRef={e => this.inDesc = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Serving Method</Label>
                                    <Input disabled={!this.state.edit} defaultValue={penyajian} type='text' innerRef={e => this.inServ = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Stocks</Label>
                                    {this.printStock()}
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup>
                                    <Label>Dose</Label>
                                    <Input disabled={!this.state.edit} defaultValue={dosis} type='textarea' innerRef={e => this.inDose = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>How to Keep</Label>
                                    <Input disabled={!this.state.edit} defaultValue={caraPenyimpanan} type='text' innerRef={e => this.inKeep = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Composition</Label>
                                    <Input disabled={!this.state.edit} defaultValue={komposisi} type='text' innerRef={e => this.inCompos = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Benefit</Label>
                                    <Input disabled={!this.state.edit} defaultValue={kegunaan} type='text' innerRef={e => this.inBenefit = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Side Effects</Label>
                                    <Input disabled={!this.state.edit} defaultValue={efekSamping} type='text' innerRef={e => this.inSide = e}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Images</Label>
                                    {this.printImages()}
                                </FormGroup>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* <button
                            className='NavbarButton py-1'
                            onClick={this.btnUpload}
                        >
                            UPLOAD
                        </button>
                        <button className='landing1 py-1' onClick={this.props.btClose}>
                            Cancel
                        </button> */}
                        {
                            this.state.edit ?
                                <button type="button" className='NavbarButton py-1' onClick={this.btnSave}>Save</button>
                                : <button type="button" className='NavbarButton py-1' onClick={() => this.setState({ edit: !this.state.edit })}>Edit</button>
                        }
                        <button className='landing1 py-1' onClick={() => {
                            this.setState({ edit: false })
                            this.props.btClose()
                        }}>Cancel</button>
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

export default connect(mapToProps, { getProductAction })(ModalEdit);