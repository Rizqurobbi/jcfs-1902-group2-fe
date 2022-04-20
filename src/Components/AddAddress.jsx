import React, { Component } from 'react';
import { FormGroup, Modal, ModalBody, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { API_URL } from '../helper';
import axios from 'axios';
import Swal from 'sweetalert2';
import { keepAction } from '../redux/actions/userAction';
import { connect } from 'react-redux';

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    btSubmit = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        })
        if (this.inAddress.value === "") {
            Toast.fire({
                icon: 'warning',
                text: 'Fill all the blank.',
                title: 'Warning'
            })
        } else {
            let token = localStorage.getItem("data")
            axios.post(`${API_URL}/users/addaddress`, { address: this.inAddress.value }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                Swal.fire({
                    title: 'Yeay!',
                    text: 'Change address success',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                this.props.btClose()
                this.props.keepAction()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        return (
            <div>
                <Modal size='md' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                    <div className='container px-5' style={{ backgroundColor: '#FCFBFA' }} >
                        <ModalBody className='px-5 py-5'>
                            <p className='heading2 m-0 pb-4' style={{ fontSize: 24 }}>Add new address</p>
                            <p className='heading4 text-muted' style={{ fontSize: 12 }}>Input your new address below</p>
                            <FormGroup style={{ width: '100%', margin: 'auto' }}>
                                <InputGroup>
                                    <Input size='sm' type="text" id="textAddress" placeholder="Your address"
                                        innerRef={(element) => this.inAddress = element} />
                                </InputGroup>
                            </FormGroup>
                            <div className='NavbarButton mt-4' style={{ margin: 'auto', textAlign: 'center', cursor: 'pointer', style: "20%" }} onClick={this.btSubmit}>
                                <button className='py-2' >Submit</button>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { keepAction })(AddAddress);