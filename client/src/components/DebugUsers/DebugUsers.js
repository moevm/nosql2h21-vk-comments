import React from 'react';
import PropTypes from 'prop-types';
import './DebugUsers.css';
import DebugUsersTable from '../DebugUsersTable/DebugUsersTable'

import axios from 'axios';

class DebugUsers extends React.Component
{
    constructor(props){
        super(props);

        this.state = {users: [], isLoading: true }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/debug/users')
            .then(res => {
                this.setState({users: res.data, isLoading: false});
            })
    }

    render(){
        if (this.state.isLoading) return (<><span className="loading">Загрузка. Подождите...</span></>);

        return(
            <>
                <div className="title"> Пользователи </div>
                <div className="row">
                    <div className="table_wrap">
                        <DebugUsersTable users={this.state.users}></DebugUsersTable>
                    </div>

                    <div className="filter_col">
                        <span className="filter_title">Фильтр отображения</span>
                        <div className="fio_row">
                            <input type="text" className="surname_input" placeholder="Фамилия"/>
                            <input type="text" className="name_input" placeholder="Имя"/>
                        </div>

                        <span className="age_title">Возраст</span>
                        <div className="age_row">
                            <span>От</span>
                            <input type="number" className="age_from"/>
                            <span>До</span>
                            <input type="number" className="age_to"/>
                        </div>
                        <input type="text" className="city_input" placeholder="Город"/>

                        <button>Применить</button>
                    </div>
                </div>
            </>
        )
    }
}

export default DebugUsers;
