import React from 'react';
import PropTypes from 'prop-types';
import './DebugUsers.css';

import axios from 'axios';

class DebugUsers extends React.Component
{
    constructor(props){
        super(props);

    }

    componentDidMount() {
        axios.get('http://localhost:3001/debug/users')
            .then(res => {
                let data = res.data;
                console.log(data);
            })
    }

    render(){
        return(
            <div className="DebugUsers">
                DebugUsers Component
            </div>
        )
        ;
    }
}

export default DebugUsers;
