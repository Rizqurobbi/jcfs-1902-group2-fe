import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../helper';

class DoctorPrescriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    handleImages = (e) => {
        this.setState({ images: { name: e.target.files[0].name, file: e.target.files[0] } })
    }

    btSubmit = () => {
        let formData = new FormData()
        formData.append('Images', this.state.images.file)
        let token = localStorage.getItem("data")
        if (token) {
            axios.post(`${API_URL}/users/uploadrecipe`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                alert('Upload Success, your request is been processed')
                window.location.reload();
            }).catch(err => {
                console.log(err)
            })
        } else {
            alert('Please login first')
        }

    }

    render() {
        return (
            <div className='container-fluid px-0' style={{ backgroundColor: '#FCFBFA' }}>
                <div className='container py-4'>
                    <div className='my-2'>
                        <p className='heading2'>Upload your doctor's prescription</p>
                        <p className='heading4'>Now you can order by uploading your doctor's prescription. We believe for the best for our customer to give them medicine as their doctor's prescription with an easy way. </p>
                        <div className='file-card'>
                            {
                                this.state.images.file ?
                                    <img src={URL.createObjectURL(this.state.images.file)} className='m-auto' style={{ width: '50%', padding: 30 }} />
                                    :
                                    <div className='file-inputs'>
                                        <input type='file' onChange={(e) => this.handleImages(e)} />
                                        <button>
                                            Upload Here
                                        </button>
                                    </div>
                            }
                            {
                                this.state.images.file ?
                                    null
                                    :
                                    <div className='text-center'>
                                        <p>Support files</p>
                                        <p>.WEBP, .JPG, .PNG</p>
                                    </div>
                            }
                        </div>
                        {
                            this.state.images.file ?
                                <div className='d-flex justify-content-end mt-4'>
                                    <div className='landing1' style={{ textAlign: 'center', cursor: 'pointer', width: "10%" }} onClick={this.btSubmit}>
                                        <button className='py-2' >Submit</button>
                                    </div>
                                    <div className='landing1' style={{ textAlign: 'center', cursor: 'pointer', width: "10%" }} onClick={() => this.setState({ images: [] })}>
                                        <button className='py-2' >Cancel</button>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorPrescriptionPage;