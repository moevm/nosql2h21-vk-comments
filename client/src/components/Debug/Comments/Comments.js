import React from 'react';
import PropTypes from 'prop-types';
import styles from './Comments.module.css';
import Table from './Table/Table';
import axios from 'axios';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            isLoading: true,
            name: "",
            surname: "",
            text: '',
            time_from: '',
            time_to: '',
            date_from: '',
            date_to: '',
            likes_from: 0,
            likes_to: 0
        }

        this.filter_records.bind(this);
        this.set_surname.bind(this);
        this.set_name.bind(this);
        this.set_text.bind(this);
        this.set_time_from.bind(this);
        this.set_time_to.bind(this);
        this.set_date_from.bind(this);
        this.set_date_to.bind(this);
        this.set_likes_from.bind(this);
        this.set_likes_to.bind(this);
    }

    componentDidMount() {
        axios.post('http://localhost:3001/debug/comments')
            .then(res => {
               this.setState({comments: res.data, isLoading: false})
            });
    }

    set_surname = (event) =>{
        this.setState({surname: event.target.value});
    }

    set_name = (event) =>{
        this.setState({name: event.target.value});
    }

    set_time_from = (event) =>{
        this.setState({time_from: event.target.value});
    }

    set_time_to = (event) =>{
        this.setState({time_to: event.target.value});
    }

    set_date_from = (event) =>{
        this.setState({date_from: event.target.value});
    }

    set_date_to = (event) =>{
        this.setState({date_to: event.target.value});
    }

    set_likes_from = (event) =>{
        this.setState({likes_from: event.target.value});
    }

    set_likes_to = (event) =>{
        this.setState({likes_to: event.target.value});
    }

    set_text = (event) =>{
        this.setState({text: event.target.value});
    }

    filter_records = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/debug/comments',
            data: {
                first_name: this.state.name,
                last_name: this.state.surname,
                text: this.state.text,
                min_date: this.state.date_from,
                max_date: this.state.date_to,
                min_time: this.state.time_from,
                max_time: this.state.time_to,
                min_likes_count: this.state.likes_from,
                max_likes_count: this.state.likes_to
            }
        }).then(res => {
            this.setState({comments: res.data, isLoading: false})
        })
    }

    render = () => {
        if (this.state.isLoading){
            return(<><span className={styles.loading}>Загрузка. Подождите...</span></>);
        }

        return(
            <>
                <div className={styles.title}> Комментарии </div>
                <div className={styles.row}>
                    <div className={styles.table_wrap}>
                        <Table comments={this.state.comments}/>
                    </div>

                    <div className={styles.filter_col}>
                        <span className={styles.filter_title}>Фильтр отображения</span>
                        <div className={styles.fio_row}>
                            <input type="text" className={styles.surname_input} placeholder="Фамилия" onChange={this.set_surname}/>
                            <input type="text" className={styles.name_input} placeholder="Имя" onChange={this.set_name}/>
                        </div>
                        <input type="text" className={styles.text_input} placeholder="Ключевая фраза" onChange={this.set_text}/>

                        <span className={styles.time_title}>Дата и время комментария</span>
                        <div className={styles.age_row}>
                            <span>От</span>
                            <input type="time" className={styles.time_from} onChange={this.set_time_from}/>
                            <span>До</span>
                            <input type="time" className={styles.time_to} onChange={this.set_time_to}/>
                        </div>
                        <div className={styles.age_row}>
                            <span>От</span>
                            <input type="date" className={styles.date_from} onChange={this.set_date_from}/>
                            <span>До</span>
                            <input type="date" className={styles.date_to} onChange={this.set_date_to}/>
                        </div>

                        <span className={styles.likes_count_title}>Количество лайков</span>
                        <div className={styles.age_row}>
                            <span>От</span>
                            <input type="number" className={styles.likes_from} onChange={this.set_likes_from}/>
                            <span>До</span>
                            <input type="number" className={styles.likes_to} onChange={this.set_likes_to}/>
                        </div>

                        <button className={styles.button} onClick={this.filter_records}>Применить</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Comments;
