import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import bannerphoto1 from '../img/landingpagecrop.png';
import recipes from '../img/recipes.jpg';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductAction } from '../redux/actions/productsAction';
import { API_URL } from '../helper';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getProductAction()
    }

    printProduct = () => {
        return this.props.products.map((val, idx) => {
            return (
                <Link to={`/products-detail?idproduct=${val.idproduct}`}>
                    <div>
                        <div width="70%">
                            <img src={API_URL + val.images[0].url} width="80%" style={{ borderRadius: 20, margin: 0 }} />
                            <div className='my-4  text-center' style={{ marginRight: 40 }} >
                                <p >{val.nama}</p>
                                <p className='heading3' style={{fontSize: 16}}>Rp. {val.harga.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    render() {
        const settings = {
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        return (
            <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA' }}>
                <div className='container'>
                    <Row style={{ marginLeft: 90 }}>
                        <Col xs="6">
                            <div>
                                <h1 className='heading1' style={{ paddingTop: 100, paddingBottom: 10 }}>
                                    Place where you find your best medicine
                                </h1>
                                <p className='heading4'>Our in-house pharmachist ensure your medicines. Positioned to help every human being to invest in their whole health.</p>
                                <div className='d-flex mt-4'>
                                    <div className='NavbarButton text-center shadow' style={{ paddingTop: 5, paddingBottom: 15 }}>
                                        <p style={{ fontSize: 32, margin: 'auto' }}>100% </p>
                                        <p>Delivery Success</p>
                                    </div>
                                    <div className='landing1 text-center py-2 mx-3 shadow' style={{ paddingTop: 5, paddingBottom: 15 }}>
                                        <p style={{ fontSize: 32, margin: 'auto' }}>5.0 </p>
                                        <p>Customer Review</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ paddingTop: 60 }}>
                                <img className="rounded fade-in m-auto" src={bannerphoto1} width="60%" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='container-fluid px-0' style={{ backgroundColor: '#F6F7FB', paddingTop: 20 }}>
                    <div className='container'>
                        <p className='heading2 text-center pt-5 pb-4'>Our Products</p>
                        <div>
                            <Slider {...settings}>
                                {this.printProduct()}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className='container-fluid px-0  py-5' style={{ backgroundColor: '#F6F7FB', paddingTop: 20 }}>
                    <div className='container'>
                        <Row>
                            <Col className='py-4' style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: 40 }}>
                                <Row>
                                    <Col xs='4' className='m-auto' style={{ paddingLeft: 40 }}>
                                        <p className='heading3'>Provide the best medicine</p>
                                        <p className='heading4'>We provide the best medicine with best quality control.</p>
                                        <Link to="/products">
                                            <button className='NavbarButton text-center py-2 mt-4' style={{ width: '80%' }}>
                                                <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Order Now</p>
                                            </button>
                                        </Link>

                                    </Col>
                                    <Col className='m-auto'>
                                        <img src={recipes} width="70%" style={{ borderRadius: 20, margin: 'auto' }} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className='py-4 px-4 mx-3' style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: 40 }}>
                                <Row>
                                    <Col xs='4' className='m-auto' style={{ paddingLeft: 40 }}>
                                        <p className='heading3'>Order by your doctor recipe</p>
                                        <p className='heading4'>Try our new service, now you can order by your doctor recipe.</p>
                                        <Link to='/doctorsprescription'>
                                            <button className='landing1 text-center py-2 mt-4' style={{ width: '80%' }}>
                                                <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Upload Now</p>
                                            </button>
                                        </Link>

                                    </Col>
                                    <Col className='m-auto'>
                                        <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" width="70%" style={{ borderRadius: 20, margin: 'auto' }} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        products: state.productsReducer.products
    }
}

export default connect(mapToProps, { getProductAction })(LandingPage);