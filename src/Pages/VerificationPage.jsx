import { Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import tickicon from '../img/tickicon1.png'
import { verifyLogin } from '../redux/actions';
import { connect } from 'react-redux';


class VerificationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    verify = async () => {
        try {
            let res = await this.props.verifyLogin()
            if (res) {
                this.setState({
                    redirect: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to='/' />
        } else {
            return (
                <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA', height: '72vh' }}>
                    <div className='container pt-5'>
                        <img className="rounded fade-in m-auto" src={tickicon} width="10%" />
                        <div className='text-center my-2'>
                            <p className='heading2'>Verify Account Success!</p>
                            <p className='heading4' style={{ marginLeft: 200, marginRight: 200 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, minus recusandae? Debitis asperiores nulla blanditiis ipsa excepturi eaque mollitia, reprehenderit, ut id, voluptatem voluptas. Natus quas voluptatem repudiandae porro in.</p>
                        </div>
                        <div className='NavbarButton' style={{ margin: 'auto', textAlign: 'center', width: "20%", marginTop: 40 }}>
                            <button className='py-2' onClick={this.verify}>Submit</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default connect(null, { verifyLogin })(VerificationPage);