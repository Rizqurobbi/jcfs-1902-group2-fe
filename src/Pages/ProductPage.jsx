import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, FormGroup, Label, InputGroup, Input } from 'reactstrap';
import { Input as I, InputLeftElement as ILE, InputGroup as IG } from '@chakra-ui/react'
import { SearchIcon, PhoneIcon } from '@chakra-ui/icons';
import header from '../img/HeaderProduct.jpg'
import { FaFilter } from 'react-icons/fa'
import { connect } from 'react-redux';
import { getProductAction, sortingProduct } from '../redux/actions/productsAction';
import { Link } from 'react-router-dom';
import { API_URL } from '../helper';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            inputNama: ''
        }
    }
    componentDidMount() {
        this.props.getProductAction()
    }
    printProduct = () => {
        let { page, product } = this.state
        return this.props.products.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return (
                <div className="col-3" >
                    <Card style={{ border: 'none', borderRadius: '14px', cursor: 'pointer', height: '350px' }} className='producthover mt-4 '>
                        <Link to={`/products-detail?idproduct=${value.idproduct}`}>
                            <CardImg
                                src={value.images[0].url.includes("http") ? value.images[0].url : API_URL + value.images[0].url}
                                width='100%'
                                style={{ padding: 20 }}
                                className='zoom'
                            />
                            <CardBody style={{ textAlign: 'center' }}>
                                <CardTitle className='heading3' style={{ fontSize: 16 }}>{value.nama}</CardTitle>
                                <CardTitle className='heading3' style={{ fontSize: 18 }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                            </CardBody>
                        </Link>
                    </Card>
                </div>
            )
        })
    }
    printBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.products.length / 8); i++) {
            btn.push(
                <Button
                    style={{ border: "none" }}
                    className='NavbarButton'
                    disabled={this.state.page == i + 1 ? true : false}
                    onClick={() => this.setState({ page: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }

    btnFilter= () => {
        if(this.inCategory.value=='All Products'&&this.state.inputNama==''){
            this.props.getProductAction()
        }else{
            this.props.getProductAction({
                nama: this.state.inputNama,
                idcategory: this.inCategory.value
            })
        }
        console.log(this.inCategory.value)

    }
    btnClick = (e) => {
        this.props.sortingProduct({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }
    btnReset = () => {
        this.inCategory.value='All Products'
        this.setState({inputNama:''})
        this.props.getProductAction()
        console.log(this.state.inputNama)
    }

    render() {
        return (
            <div className='container-fluid' style={{ background: '#FCFBFA', paddingTop: 20 }}>
                <div className='container'>
                    <div style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: "url(" + header + ")", backgroundRepeat: 'no-repeat', width: '100%', height: '32vh', borderRadius: '50px',marginBottom:10 }}>
                        <div style={{ paddingTop: '11vh', paddingLeft: '260px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Our Product</h1>
                        </div>
                    </div>
                    <div className="row" >
                        <div className='col-3 py-4'>
                            <div style={{ background: 'white', height: '33vh', borderRadius: '15px', padding: 10 }}>
                                <div style={{ display: 'flex', borderBottom: '2px solid #1E144F', width: '85px', height: '40px', fontSize: 20 }}>
                                    <span style={{ marginTop: 8, color: '#E63E54' }}>
                                        <FaFilter />
                                    </span>
                                    <p className='heading3' style={{ marginBottom: 5.5, marginTop: 4, fontWeight: 'bolder' }}>FILTER</p>
                                    <FormGroup style={{ marginTop: 4 ,marginLeft:'100%'}}>
                                        <InputGroup>
                                            <Input type='select' style={{ width: "100px", borderRadius: 10 }}
                                                onChange={this.btnClick}>
                                                <option value="idproduct-asc">Sort</option>
                                                <option value="harga-asc">Harga Asc</option>
                                                <option value="harga-desc">Harga Desc</option>
                                                <option value="nama-asc">A-Z</option>
                                                <option value="nama-desc">Z-A</option>
                                                <option value="idproduct-asc">Reset</option>
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <Label>Name</Label>
                                    <IG style={{ borderRadius: 50 }} >
                                        <ILE
                                            pointerEvents='none'
                                            children={<SearchIcon color='gray.300' />}
                                        />
                                        <I type='tel' placeholder='Search' value={this.state.inputNama} onChange={(text) => this.setState({ inputNama: text.target.value })} />
                                    </IG>
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <Input type='select' style={{ width: "100%", borderRadius: 0 }}
                                            innerRef={elemen => this.inCategory = elemen}>
                                            <option value={null}>All Products</option>
                                            {
                                                this.props.category.map((value, index) => <option value={value.idcategory} key={value.idcategory}>{value.category}</option>)
                                            }
                                        </Input>
                                    </FormGroup>
                                    <div style={{ marginLeft: '148px', marginTop: '15px' }}>
                                        <Button className='landing1' onClick={this.btnReset} style={{ border: 'none' }}>Reset</Button>
                                        <Button className='NavbarButton' style={{ marginLeft: '10px', border: 'none' }} onClick={this.btnFilter}>Filter</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                                {this.printProduct()}
                            </div>
                            <div className="my-5 text-center">
                                <ButtonGroup>
                                    {this.printBtnPagination()}
                                </ButtonGroup>
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
        products: state.productsReducer.products,
        category: state.productsReducer.category
    }
}

export default connect(mapToProps, { getProductAction, sortingProduct })(ProductPage);