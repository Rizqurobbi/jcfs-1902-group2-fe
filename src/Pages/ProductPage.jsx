import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, FormGroup, Label, InputGroup, Input } from 'reactstrap';
import { Input as I, InputLeftElement as ILE, InputGroup as IG } from '@chakra-ui/react'
import { SearchIcon, PhoneIcon } from '@chakra-ui/icons';
import header from '../img/HeaderProduct.jpg'
import { FaFilter } from 'react-icons/fa'
import { connect } from 'react-redux';
import { getProductAction, sortingProduct } from '../redux/actions/productsAction';
class ProductPage extends React.Component {
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
                <div className="col-3">
                    <Card style={{ border: 'none', borderRadius: '14px', cursor: 'pointer' }} className='producthover mt-4 '>
                        <CardImg
                            src={value.images[0].url}
                            width='100%'
                            style={{ padding: 20 }}
                            className='zoom'
                        />
                        <CardBody style={{ textAlign: 'center' }}>
                            <CardTitle className='cardTittle1'>{value.nama}</CardTitle>
                            <CardTitle className='heading3'>Rp. {value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }
    printBtnPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.product.length / 8); i++) {
            btn.push(
                <Button
                    className='NavbarButton'
                    disabled={this.state.page == i + 1 ? true : false}
                    onClick={() => this.setState({ page: i + 1 })}>{i + 1}
                </Button>
            )
        }
        return btn;
    }
    
    render() {
        return (
            <div className='container-fluid' style={{ background: '#F6F7FB', paddingTop: 20 }}>
                <div className='container'>
                    <div style={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: "url(" + header + ")", backgroundRepeat: 'no-repeat', width: '100%', height: '40vh', borderRadius: '15px' }}>
                        <div style={{ paddingTop: '13vh', paddingLeft: '260px' }}>
                            <h1 className='heading1' style={{ color: 'white', fontWeight: 900 }}>Our Product</h1>
                        </div>
                        <div>
                            {/* <Link to="/">
                            <a className="mx-4" style={{ fontWeight: 'bold', textDecoration: 'transparent', color: 'black', alignItems: 'center' }} title="Back to the Homepage">Home</a>
                        </Link> */}
                        </div>
                    </div>
                    <div className="row" >
                        <div className='col-3 py-4'>
                            <div style={{ background: 'white', height: '60vh', borderRadius: '15px', padding: 10 }}>
                                <div style={{ display: 'flex', borderBottom: '2px solid #1E144F', width: '85px', height: '40px', fontSize: 20 }}>
                                    <span style={{ marginTop: 8, color: '#E63E54' }}>
                                        <FaFilter />
                                    </span>
                                    <p className='heading3' style={{ marginRight: '5vw', marginBottom: 5.5, marginTop: 4, fontWeight: 'bolder' }}>FILTER</p>
                                    <FormGroup style={{ marginTop: 4 }}>
                                        <InputGroup>
                                            <Input type='select' style={{ marginLeft: 20, width: "100px", borderRadius: 10 }}
                                            >
                                                {/* innerRef={(element) => this.inSearchSort = element} */}
                                                <option value="id-asc">Sort</option>
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
                                    {/* <FormGroup>
                                        <Label>Nama</Label>
                                        <Input type="text" id="text" placeholder="Cari Produk"
                                        />
                                    </FormGroup> */}
                                    <Label>Name</Label>
                                    <IG style={{ borderRadius: 50 }} >
                                        <ILE
                                            pointerEvents='none'
                                            children={<SearchIcon color='gray.300' />}
                                        />
                                        <I type='tel' placeholder='Search'  />
                                    </IG>
                                    {/* <Label>Price</Label>
                                    <IG style={{ borderRadius: 50 }} >
                                        <I type='number' placeholder='Price' />
                                    </IG> */}
                                    <FormGroup>
                                        <Label>Category</Label>
                                        <InputGroup style={{}}>
                                            <Input type='select' style={{ width: "250px", borderRadius: 0 }}
                                            >
                                                {/* innerRef={(element) => this.inSearchSort = element} */}
                                                <option value="id-asc">Category</option>
                                                <option value="harga-asc">Cough</option>
                                                <option value="harga-desc">Skin</option>
                                                <option value="nama-asc">Headache</option>
                                                <option value="nama-desc">Fever</option>
                                                <option value="idproduct-asc">Reset</option>
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <div style={{ marginLeft: '150px', marginTop: '15px' }}>
                                        <Button>Reset</Button>
                                        <Button style={{ marginLeft: '10px' }} >Filter</Button>
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
        products: state.productsReducer.products
    }
}
export default connect(mapToProps, { getProductAction })(ProductPage);