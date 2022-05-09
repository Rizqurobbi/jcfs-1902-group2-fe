import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';
import Swal from 'sweetalert2';
import { TabList, Tabs, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import moment from 'moment';


class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: [''],
            edit: false
        }
    }
    btnSave = () => {
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
            efekSamping: this.inSide.value,
            stocks: this.state.stocks
        }
        formData.append(`data`, JSON.stringify(data))
        this.state.images.forEach(val => formData.append('Images', val.file))
        console.log(data)
        axios.patch(`${API_URL}/products/${this.props.productDetail.idproduct}`, formData)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Edit success',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.props.btClose()
                this.setState({ edit: false })
                this.props.getProductAction()
            }).catch(err => {
                console.log(err)
            })

    }
    printStock = () => {
        if (this.props.productDetail.stocks) {
            return this.props.productDetail.stocks.map((value, index) => {
                return <Row>
                    <Col>
                        <Input disabled defaultValue={value.qty} type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <Input disabled defaultValue={value.satuan} type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
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
                                <img src={API_URL + value.url} style={{ width: '40%', marginTop: 20, marginBottom: 20, boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px' }} />
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

    btnSaveStock = () => {
        let data = {
            idproduct: this.props.productDetail.idproduct,
            idunit: this.props.productDetail.stocks[0].idunit,
            qty: parseInt(this.stockIn.value),
            date: moment().format('YYYY-MM-DD')
        }
        axios.post(`${API_URL}/products/instock`, data)
            .then(res => {
                if (res.data.success) {
                    Swal.fire({
                        title: 'Yeay!',
                        text: 'Edit success',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    this.props.btClose()
                    this.props.getProductAction()
                }
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        let { idcategory, nama, category, harga, deskripsi, penyajian, dosis, caraPenyimpanan, kegunaan, komposisi, efekSamping } = this.props.productDetail
        console.log('iniproductdetail', this.props.productDetail)
        return (
            <div>
                <Modal
                    centered
                    fullscreen="sm"
                    size="lg"
                    isOpen={this.props.modalOpen}
                    toggle={this.props.btClose}
                >
                    <ModalHeader toggle={this.props.btClose}>
                        <p className='heading3' style={{ marginLeft: '16.6vw', marginTop: '10px' }}>Edit Product</p>
                    </ModalHeader>
                    <ModalBody>
                        <Tabs size='md' colorScheme='#231953'>
                            <>
                                <TabList style={{ marginBottom: 5 }}>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Edit Product</Tab>
                                    <Tab className='heading2' _selected={{ color: 'white', bg: 'linear-gradient(163deg, rgba(126,197,255,1) 0%, rgba(80,175,255,1) 46%, rgba(6,142,255,1) 100%)' }} style={{ borderRadius: 10 }}>Add Product Stock</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel className='p-4'>
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
                                    </TabPanel>
                                    <TabPanel style={{ height: '52vh' }}>
                                        <div className='d-flex'>
                                            <Input type="number" placeholder='Stock' style={{ width: '30%' }} innerRef={(element) => this.stockIn = element} />
                                            <button type="button" className='NavbarButton py-2 mx-2' onClick={this.btnSaveStock}>Save</button>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </>
                        </Tabs>
                    </ModalBody>
                    <ModalFooter>
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