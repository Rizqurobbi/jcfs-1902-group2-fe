import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import fireworks from '../img/fireworks.png'


class ResetPasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to='/' />
        } else {
            return (
                <div>
                    <Modal size='md' isOpen={this.props.modalOpen} toggle={this.props.btClose} centered >
                        <img className="m-auto mt-5 " src={fireworks} width="30%" />
                        <p className='text-center'>Yeay, your password has been changed! </p>
                        <div className='NavbarButton mt-4 mb-5' style={{ margin: 'auto', textAlign: 'center', width: "20%", cursor: 'pointer' }}
                            onClick={() => this.setState({ redirect: !this.state.redirect })}>
                            <button className='py-2'>Submit</button>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

export default ResetPasswordModal;