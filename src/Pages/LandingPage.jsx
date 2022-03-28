import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import bannerphoto1 from '../img/landingpagecrop.png';
import recipes from '../img/recipes.jpg';
import Slider from "react-slick";

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-10453.jpg?context=bWFzdGVyfGltYWdlc3wxMjM0MDd8aW1hZ2UvanBlZ3xoNDEvaDdjLzEwMTc2OTA1NjQyMDE0L1dUQ0lELTEwNDUzLWZyb250LmpwZ3xkNGZiYzhkNTYyMDc0ZWZiNDE1ZTNlMzZjN2VkZjViYWY0ZWM2ZjBjNGM1Yjg3ZTcwZTI3YTI0N2YzODM3NjUz',
                    nama: 'Vicks',
                    harga: 12000
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-11361.jpg?context=bWFzdGVyfGZyb250L3pvb218MTIzNTg0fGltYWdlL2pwZWd8ZnJvbnQvem9vbS9oYzkvaGQ5LzkyMTM0MjI3OTY4MzAuanBnfDM5ZDc0NzE3Nzg1ZDhkYmQxMzlmY2YxNGQzZDlhMjA0MzdhNjgxOGNlOGNkZGFjYjUzODY5YWIzZWVkNmVlN2Y',
                    nama: 'Konidin',
                    harga: 2500
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-16250.jpg?context=bWFzdGVyfGZyb250L3pvb218MTQ3NzczfGltYWdlL2pwZWd8ZnJvbnQvem9vbS9oZDMvaDYyLzkyMTQ2ODcyMTU2NDYuanBnfDk3NGVlMWNhZGZiZjk5NmZjZWM4MmVjMWQ4ZDAyNzUxMWU3MGYzYjgwODI3MzYzMjdhZGEwZjRmOWZjMWI3ZjY',
                    nama: 'Komix',
                    harga: 22000
                },
                {
                    url: 'https://api.watsons.co.id/medias/WOODS-HERBAL-COUGH-SYRUP-60ML-13081.jpg?context=bWFzdGVyfGZyb250L3pvb218MTUwMzAxfGltYWdlL2pwZWd8ZnJvbnQvem9vbS84ODkxMjYyNjY0NzM0LmpwZ3w4N2VkY2JjZWI5NWM5NzgyNDk5ZjI3YTk4NDY0NjYzYmM3ZjI3OTFlOTkzNDIxNTIyMjQ1NDMyMDZiMzRhMzk3',
                    nama: 'Woods',
                    harga: 20000
                },
                {
                    url: 'https://api.watsons.co.id/medias/BENADRYL-BATUK-BERDAHAK-SYRUP-50ML-14278.jpg?context=bWFzdGVyfGZyb250L3pvb218NzIwNDh8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5MDcwODg2OTEyMzAuanBnfGU0N2EzYmZiM2FjMDkxNWNiZTJhMWQ2ZTBkMjI5YWM0MDNmNzRmN2I5NGFmNWEzMDc4NWZkNzIxY2U5MzU5NzI',
                    nama: 'Benadryl',
                    harga: 25000
                },
                {
                    url: 'https://api.watsons.co.id/medias/MEXTRIL-TABLET-25X4S-STR-11197.jpg?context=bWFzdGVyfGZyb250L3pvb218MjQ1MjQxfGltYWdlL2pwZWd8ZnJvbnQvem9vbS84ODkxODQ3NDA5Njk0LmpwZ3w5NzlkMzY5NzczNzNhYzUxYmRmYmRhYjAxMTcyZjdlOGQ0ZDAyMzYzM2E5ZmUxZWU1Mjk2NDEzNTZlNjI5MTNm',
                    nama: 'Mextril',
                    harga: 18000
                },
                {
                    url: 'https://api.watsons.co.id/medias/BISOLVON-KID-4MG5ML-SYRUP-60ML-10473.jpg?context=bWFzdGVyfGZyb250L3pvb218OTM1MTB8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5MDcxMjk4NDc4MzguanBnfDYyN2JhNWY2OGJhNTRmZjAzZThlNzU2NzAzM2U2MjIzMTlhYWI2M2FhZTRlNzk4NzAwNjNiZDNhMzVkYzRkZGE',
                    nama: 'Bisolvon',
                    harga: 32000
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-12402.jpg?context=bWFzdGVyfGZyb250L3pvb218ODExODV8aW1hZ2UvanBlZ3xmcm9udC96b29tL2hkZi9oZWEvOTAzNjA1ODYyNDAzMC5qcGd8NjAzYTlhMTRmZDJiMDk4OGFhOTY3MDc4NmRkOWNiZDkwZDJjOWRlNWIwMWRjYzY4NDQ3OWI1NzMyYjUxZjcyNA',
                    nama: 'A.Vogel',
                    harga: 28000
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-12402.jpg?context=bWFzdGVyfGZyb250L3pvb218ODExODV8aW1hZ2UvanBlZ3xmcm9udC96b29tL2hkZi9oZWEvOTAzNjA1ODYyNDAzMC5qcGd8NjAzYTlhMTRmZDJiMDk4OGFhOTY3MDc4NmRkOWNiZDkwZDJjOWRlNWIwMWRjYzY4NDQ3OWI1NzMyYjUxZjcyNA',
                    nama: 'A.Vogel',
                    harga: 28000
                },
                {
                    url: 'https://api.watsons.co.id/medias/BISOLVON-KID-4MG5ML-SYRUP-60ML-10473.jpg?context=bWFzdGVyfGZyb250L3pvb218OTM1MTB8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5MDcxMjk4NDc4MzguanBnfDYyN2JhNWY2OGJhNTRmZjAzZThlNzU2NzAzM2U2MjIzMTlhYWI2M2FhZTRlNzk4NzAwNjNiZDNhMzVkYzRkZGE',
                    nama: 'Bisolvon',
                    harga: 32000
                },
                {
                    url: 'https://api.watsons.co.id/medias/MEXTRIL-TABLET-25X4S-STR-11197.jpg?context=bWFzdGVyfGZyb250L3pvb218MjQ1MjQxfGltYWdlL2pwZWd8ZnJvbnQvem9vbS84ODkxODQ3NDA5Njk0LmpwZ3w5NzlkMzY5NzczNzNhYzUxYmRmYmRhYjAxMTcyZjdlOGQ0ZDAyMzYzM2E5ZmUxZWU1Mjk2NDEzNTZlNjI5MTNm',
                    nama: 'Mextril',
                    harga: 18000
                },
                {
                    url: 'https://api.watsons.co.id/medias/BENADRYL-BATUK-BERDAHAK-SYRUP-50ML-14278.jpg?context=bWFzdGVyfGZyb250L3pvb218NzIwNDh8aW1hZ2UvanBlZ3xmcm9udC96b29tLzg5MDcwODg2OTEyMzAuanBnfGU0N2EzYmZiM2FjMDkxNWNiZTJhMWQ2ZTBkMjI5YWM0MDNmNzRmN2I5NGFmNWEzMDc4NWZkNzIxY2U5MzU5NzI',
                    nama: 'Benadryl',
                    harga: 25000
                },
                {
                    url: 'https://api.watsons.co.id/medias/WOODS-HERBAL-COUGH-SYRUP-60ML-13081.jpg?context=bWFzdGVyfGZyb250L3pvb218MTUwMzAxfGltYWdlL2pwZWd8ZnJvbnQvem9vbS84ODkxMjYyNjY0NzM0LmpwZ3w4N2VkY2JjZWI5NWM5NzgyNDk5ZjI3YTk4NDY0NjYzYmM3ZjI3OTFlOTkzNDIxNTIyMjQ1NDMyMDZiMzRhMzk3',
                    nama: 'Woods',
                    harga: 20000
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-16250.jpg?context=bWFzdGVyfGZyb250L3pvb218MTQ3NzczfGltYWdlL2pwZWd8ZnJvbnQvem9vbS9oZDMvaDYyLzkyMTQ2ODcyMTU2NDYuanBnfDk3NGVlMWNhZGZiZjk5NmZjZWM4MmVjMWQ4ZDAyNzUxMWU3MGYzYjgwODI3MzYzMjdhZGEwZjRmOWZjMWI3ZjY',
                    nama: 'Komix',
                    harga: 22000
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-11361.jpg?context=bWFzdGVyfGZyb250L3pvb218MTIzNTg0fGltYWdlL2pwZWd8ZnJvbnQvem9vbS9oYzkvaGQ5LzkyMTM0MjI3OTY4MzAuanBnfDM5ZDc0NzE3Nzg1ZDhkYmQxMzlmY2YxNGQzZDlhMjA0MzdhNjgxOGNlOGNkZGFjYjUzODY5YWIzZWVkNmVlN2Y',
                    nama: 'Konidin',
                    harga: 2500
                },
                {
                    url: 'https://api.watsons.co.id/medias/zoom-front-10453.jpg?context=bWFzdGVyfGltYWdlc3wxMjM0MDd8aW1hZ2UvanBlZ3xoNDEvaDdjLzEwMTc2OTA1NjQyMDE0L1dUQ0lELTEwNDUzLWZyb250LmpwZ3xkNGZiYzhkNTYyMDc0ZWZiNDE1ZTNlMzZjN2VkZjViYWY0ZWM2ZjBjNGM1Yjg3ZTcwZTI3YTI0N2YzODM3NjUz',
                    nama: 'Vicks',
                    harga: 12000
                },
            ],
        }
    }

    printProduct = () => {
        return this.state.product.map((val, idx) => {
            return (
                <div>
                    <div width="100%"> 
                        <img src={val.url} width="80%" style={{ borderRadius: 20, margin: 0 }} />
                        <div className='my-4  text-center' >
                            <p >{val.nama}</p>
                            <p className='heading3' >Rp. {val.harga.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
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
                                    <div className='NavbarButton text-center' style={{ paddingTop: 5, paddingBottom: 15 }}>
                                        <p style={{ fontSize: 32, margin: 'auto' }}>100% </p>
                                        <p>Delivery Success</p>
                                    </div>
                                    <div className='landing1 text-center py-2 mx-3' style={{ paddingTop: 5, paddingBottom: 15 }}>
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
                        <p className='heading2 text-center pt-5 pb-4'>Our Product</p>
                        <div>
                            <Slider {...settings}>
                                {this.printProduct()}
                                {/* <div className='m-auto' >
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.0g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.1g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.2g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.3g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.4g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.5g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div>
                                <div className='m-auto'>
                                    <img src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" width="80%" />
                                    <div className='my-5' >
                                        <p >Lorem Ipsum 0.6g</p>
                                        <p className='heading3' >Rp. 00.000</p>
                                    </div>
                                </div> */}
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
                                        <button className='NavbarButton text-center py-2 mt-4' style={{ width: '80%' }}>
                                            <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Order Now</p>
                                        </button>
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
                                        <button className='landing1 text-center py-2 mt-4' style={{ width: '80%' }}>
                                            <p style={{ fontSize: 15, fontWeight: 'bold', margin: 'auto' }}>Upload Now</p>
                                        </button>
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

export default LandingPage;