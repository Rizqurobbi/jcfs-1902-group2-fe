import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';



class ProductManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
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
        axios.post(API_URL + '/products', formData)
            .then(res => {
                console.log(res.data)
                this.props.getProductsAction()
                alert('Add Product Success')
            }).catch(err => {
                console.log(err)
            })

    }
    onBtAddStock = () => {
        // let tempStock = [...this.state.stock]
        this.state.stocks.push({ id: null, type: null, qty: null })
        this.setState({ stocks: this.state.stocks })
    }

    // menambah penampung data image pada state.images
    onBtAddImages = () => {
        this.state.images.push("")
        this.setState({ images: this.state.images })
    }
    onBtDeleteStock = (index) => {
        this.state.stocks.splice(index, 1)
        this.setState({ stocks: this.state.stocks })
    }

    onBtDeleteImage = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.images })
    }
    printStock = () => {
        if (this.state.stocks.length > 0) {
            return this.state.stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    // render element input form image
    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
                return <Row>
                    <Col>
                        <Input style={{ width: '10vw' }} accept="image/*" type="file" placeholder={`Select Images-${index + 1}`}
                            onChange={(e) => this.handleImages(e, index)} />
                        {
                            item.file ?
                                <img src={URL.createObjectURL(item.file)} style={{ width: '60%', marginTop: 20, marginBottom: 20 }} />
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
    // handleUnit = (e, index) => {
    //     console.log(this.state.stocks)
    //     let temp = [...this.state.stocks]
    //     temp[index].idunit = parseInt(e.target.value)
    //     this.setState({ stocks: temp })
    // }

    onBtCancel = () => {
        this.setState({ stocks: [], images: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }
    render() {
        // console.log(this.props.unit)
        console.log(typeof (this.props.unit))
        console.log(typeof (this.props.category))
        console.log(this.inUnit)
        return (
            <div className='container-fluid'>
                <div className='container'>
                    <div className="container">
                        <div className='row'>
                            <div className='col-7' style={{ background: 'blue', height: '20vh' }}>

                            </div>
                            <div className='col-5' style={{ background: 'white', height: 'auto', padding: 20 }}>
                                <div style={{ border: '1px solid black', borderRadius: 10, height: 'auto', width: '25vw', margin: 'auto', padding: 30 }}>
                                    <div>
                                        <p className='heading2 text-center'>ADD PRODUCT</p>
                                    </div>
                                    <div>
                                        <FormGroup>
                                            <Label>Product Name</Label>
                                            <Input type='text' innerRef={e => this.inName = e}></Input>
                                        </FormGroup>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <FormGroup>
                                                    <Label>Price</Label>
                                                    <Input type='Number' innerRef={e => this.inPrice = e}></Input>
                                                </FormGroup>
                                            </div>
                                            <div className='col-6'>
                                                <FormGroup>
                                                    <Label>Unit</Label>
                                                    <Input type='select'
                                                        innerRef={e => this.inUnit = e}>
                                                        <option value={null}>Unit</option>
                                                        {
                                                            this.props.unit.map((value, index) => <option value={value.idunit} key={value.idunit}>{value.satuan}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <FormGroup>
                                            <Label>Stocks</Label>
                                            <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} className='landing1' onClick={this.onBtAddStock}>ADD</Button>
                                            {this.printStock()}
                                        </FormGroup>
                                        <div className='row'>
                                            <div className='col-6'>
                                                {/* <FormGroup>
                                                    <Label>Unit</Label>
                                                    <Input type='select'>
                                                        <option value={null}>Unit</option>
                                                        {
                                                            this.props.unit.map((value, index) => <option value={value.idunit} key={value.idunit}>{value.satuan}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup> */}
                                                <FormGroup>
                                                    <Label>Category</Label>
                                                    <Input type='select' innerRef={e => this.inCategory = e}>
                                                        <option value={null}>Category</option>
                                                        {
                                                            this.props.category.map((value, index) => <option value={value.idcategory} key={value.idcategory}>{value.category}</option>)
                                                        }
                                                    </Input>
                                                </FormGroup>
                                            </div>
                                            <div className='col-6'>
                                                <FormGroup>
                                                    <Label>Weight</Label>
                                                    <Input type='Number' innerRef={e => this.inWeight = e}></Input>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <FormGroup>
                                            <Label>Description</Label>
                                            <Input type='text' innerRef={e => this.inDesc = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Serving Method</Label>
                                            <Input type='text' innerRef={e => this.inServ = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Dose</Label>
                                            <Input type='text' innerRef={e => this.inDose = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>How to Keep</Label>
                                            <Input type='text' innerRef={e => this.inKeep = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Composition</Label>
                                            <Input type='text' innerRef={e => this.inCompos = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Benefit</Label>
                                            <Input type='text' innerRef={e => this.inBenefit = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Side Effects</Label>
                                            <Input type='text' innerRef={e => this.inSide = e}></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Images</Label>
                                            <Button type="button" size="sm" style={{ float: 'right', margin: 'auto' }} className='landing1' onClick={this.onBtAddImages}>ADD</Button>
                                            {this.printImages()}
                                        </FormGroup>
                                    </div>
                                    <div style={{ marginTop: 20 }}>
                                        <Button className='NavbarButton' style={{ width: '100%' }} onClick={this.btnUpload}>UPLOAD</Button>
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
        category: state.productsReducer.category,
        unit: state.productsReducer.unit,
        products: state.productsReducer.products
    }
}
export default connect(mapToProps, { getProductAction })(ProductManagement)