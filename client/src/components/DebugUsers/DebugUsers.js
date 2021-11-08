import React from 'react';
import PropTypes from 'prop-types';
import './DebugUsers.css';
import DebugUsersTable from '../DebugUsersTable/DebugUsersTable'

import axios from 'axios';

class DebugUsers extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            users: [],
            isLoading: true,
            name: "",
            surname: "",
            age_from: 0,
            age_to: 200,
            city: ""
        }
        this.filter_records.bind(this);
        this.set_surname.bind(this);
        this.set_name.bind(this);
        this.set_age_from.bind(this);
        this.set_age_to.bind(this);
        this.set_city.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3001/debug/users')
            .then(res => {
                this.setState({users: res.data, isLoading: false});
            })
    }

    filter_records = () =>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/debug/users',
            data: {
                first_name: this.state.name,
                last_name: this.state.surname,
                town: this.state.city,
                min_age: this.state.age_from,
                max_age: this.state.age_to
            }
        }).then(res => {
            this.setState({users: res.data, isLoading: false});
        });
    }

    set_surname = (event) =>{
        this.setState({surname: event.target.value});
    }

    set_name = (event) =>{
        this.setState({name: event.target.value});
    }

    set_age_from = (event) =>{
        this.setState({age_from: event.target.value});
    }

    set_age_to = (event) =>{
        this.setState({age_to: event.target.value});
    }

    set_city = (event) =>{
        this.setState({city: event.target.value});
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
                            <input type="text" className="surname_input" placeholder="Фамилия" onChange={this.set_surname}/>
                            <input type="text" className="name_input" placeholder="Имя" onChange={this.set_name}/>
                        </div>

                        <span className="age_title">Возраст</span>
                        <div className="age_row">
                            <span>От</span>
                            <input type="number" className="age_from" onChange={this.set_age_from}/>
                            <span>До</span>
                            <input type="number" className="age_to" onChange={this.set_age_to}/>
                        </div>
                        <input type="text" className="city_input" placeholder="Город" onChange={this.set_city}/>

                        <button onClick={this.filter_records}>Применить</button>
                    </div>
                </div>
            </>
        )
    }
}

export default DebugUsers;
