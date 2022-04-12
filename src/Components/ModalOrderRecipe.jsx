import React, { Component } from 'react';
import { Modal, ModalBody, FormGroup, InputGroup, Input, Row, Col, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/actions';
import { connect } from 'react-redux';


class ModalAddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderProducts: {},
            images: [],
            AddProduct: []
        }
    }

    componentDidMount() {
        this.props.getProductAction()
    }

    printOrderProducts = () => {
        if (this.state.orderProducts.length > 0) {
            return this.state.orderProducts.map((item, index) => {
                return <Row>
                    <Col>
                        <Input style={{ width: '10vw' }} type="text" placeholder={`Select Images-${index + 1}`}
                            onChange={(e) => this.handleProduct(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    handleStock = (e, index) => {
        console.log(this.state.stocks)
        let temp = [...this.state.stocks]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }

    printCart = () => {
        
    }


    render() {
        console.log('tess', this.props.products)
        return (
            <div>
                <Modal size='lg' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                    <div className='container px-3' style={{ backgroundColor: '#FCFBFA' }} >
                        <ModalBody className='px-5 py-5'>
                            <Row>
                                <Col>
                                    <img src={API_URL + this.props.detailRecipe.url} width="100%" className='m-auto' />
                                </Col>
                                <Col>
                                    <p className='heading2 m-0 pb-3' style={{ fontSize: 24 }}>Choose Product</p>
                                    <FormGroup>
                                        <Label>Product</Label>
                                        <div className='d-flex'>
                                            <Input type='select'
                                                innerRef={e => this.inUnit = e}>
                                                <option value={null}>Choose product...</option>
                                                {
                                                    this.props.products.map((val, index) => <option value={val.idproduct} key={val.idproduct}>{val.nama}</option>)
                                                }
                                            </Input>
                                        </div>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Stocks</Label>
                                        <div className='d-flex'>
                                            <Input style={{ marginRight: '5px' }} type="number" placeholder={`Qty`} innerRef={e => this.inQty = e} />
                                            <Input type='select'
                                                innerRef={e => this.inUnit = e}>
                                                <option value={null}>Unit</option>
                                                {
                                                    this.props.unit.map((val, index) => <option value={val.idunit} key={val.idunit}>{val.satuan}</option>)
                                                }
                                            </Input>
                                        </div>
                                    </FormGroup>
                                    <div className='NavbarButton mt-4' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer', style: "20%" }} onClick={this.btSubmit}>
                                        <button className='py-2' >Submit</button>
                                    </div>
                                </Col>
                            </Row>
                            <div className='container pt-3' style={{ backgroundColor: '#FCFBFA' }} >
                                <p className='heading2 m-0' style={{ fontSize: 24 }}>Carts</p>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        unit: state.productsReducer.unit,
        products: state.productsReducer.products
    }
}

export default connect(mapToProps, { getProductAction })(ModalAddRecipe);