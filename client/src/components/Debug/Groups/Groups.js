import React from 'react';
import PropTypes from 'prop-types';
import styles from './Groups.module.css';
import Table from './Table/Table';

import axios from 'axios';

class Groups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            isLoading: true,
            name: "",
            users_from: '',
            users_to: '',
            comments_from: '',
            comments_to: ''
        }

        this.filter_records.bind(this);
        this.set_name.bind(this);
        this.set_users_from.bind(this);
        this.set_users_to.bind(this);
        this.set_comments_from.bind(this);
        this.set_comments_to.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3001/debug/groups')
            .then(res => {
                this.setState({groups: res.data, isLoading: false});
            })
    }

    set_name = (event) =>{
        this.setState({name: event.target.value});
    }

    set_users_from = (event) =>{
        this.setState({users_from: event.target.value});
    }

    set_users_to = (event) =>{
        this.setState({users_to: event.target.value});
    }

    set_comments_from = (event) =>{
        this.setState({comments_from: event.target.value});
    }

    set_comments_to = (event) =>{
        this.setState({comments_to: event.target.value});
    }

    filter_records = () => {
        console.log(this.state);
        axios({
            method: 'post',
            url: 'http://localhost:3001/debug/groups',
            data: {
                title: this.state.name,
                min_users_count: this.state.users_from,
                max_users_count: this.state.users_to,
                min_comments_count: this.state.comments_from,
                max_comments_count: this.state.comments_to
            }
        }).then(res => {
            this.setState({groups: res.data, isLoading: false});
        });
    }

    render() {
        if (this.state.isLoading){
            return(<><span className={styles.loading}>Загрузка. Подождите...</span></>);
        }

        return (
            <>
                <div className={styles.title}> Группы </div>
                <div className={styles.row}>
                    <div className={styles.table_wrap}>
                        <Table groups={this.state.groups}/>
                    </div>

                    <div className={styles.filter_col}>
                        <span className={styles.filter_title}>Фильтр отображения</span>
                        <input type="text" className={styles.group_input} placeholder="Группа" onChange={this.set_name}/>

                        <span className={styles.users_count_title}>Количество пользователей</span>
                        <div className={styles.age_row}>
                            <span>От</span>
                            <input type="number" className={styles.users_from} onChange={this.set_users_from}/>
                            <span>До</span>
                            <input type="number" className={styles.users_to} onChange={this.set_users_to}/>
                        </div>

                        <span className={styles.comments_count_title}>Количество комментариев</span>
                        <div className={styles.age_row}>
                            <span>От</span>
                            <input type="number" className={styles.comments_from} onChange={this.set_comments_from}/>
                            <span>До</span>
                            <input type="number" className={styles.comments_to} onChange={this.set_comments_to}/>
                        </div>

                        <button className={styles.button} onClick={this.filter_records}>Применить</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Groups;
