import React, { Component } from 'react';

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className='m-auto'>
                <h1 className='heading1' style={{ paddingTop: 100, paddingBottom: 10 }}>
                    404 PAGE NOT FOUND
                </h1>
            </div>
        );
    }
}

export default NotFoundPage;