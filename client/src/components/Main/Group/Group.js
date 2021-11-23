import React from 'react';
import PropTypes from 'prop-types';
import styles from './Group.module.css';
import axios from 'axios';
import Chart from 'chart.js/auto';
import Table from './Table/Table'

// Настройки графиков
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                font:{
                    size: '14'
                },
                color: 'black'
            }
        }
    }
};

// Создание графиков
let data = {
    labels: [],
    datasets: [
    {
        label: 'Количество комментариев',
        backgroundColor: "#063f2a",
        data: []
    }]
};

let myChart;

class Group extends React.Component{
    chartRef = React.createRef();

    constructor(props) {
        super(props);

        const now = new Date();
        const now_month = `${(now.getMonth() + 1 < 10) ? `0${now.getMonth() + 1}` : now.getMonth() + 1}`;
        const now_date = `${(now.getDate() < 10) ? `0${now.getDate()}` : now.getDate()}`;
        const max_date = `${now.getFullYear()}-${now_month}-${now_date}`;

        const ago = new Date(new Date - 14 * 24 * 60 * 60 * 1000);
        const ago_month = `${(ago.getMonth() + 1 < 10) ? `0${ago.getMonth() + 1}` : ago.getMonth() + 1}`;
        const ago_date = `${(ago.getDate() < 10) ? `0${ago.getDate()}` : ago.getDate()}`;
        const min_date = `${ago.getFullYear()}-${ago_month}-${ago_date}`;

        this.state = {
            isLoading: true,
            id: 0,
            name: "",
            search_phrase: "",
            filter_phrase: "",
            min_date: min_date,
            max_date: max_date,
            min_time: "00:00:00",
            max_time: "23:59:00",
            row_count: 4,
            buf_row_count: 4
        };

        this.set_search_phrase.bind(this);
        this.set_filter_phrase.bind(this);
        this.set_date_from.bind(this);
        this.set_date_to.bind(this);
        this.set_time_from.bind(this);
        this.set_time_to.bind(this);
        this.filter_records.bind(this);
        this.search_phrase.bind(this);
        this.set_row_count.bind(this);
        this.resize_table.bind(this);
    }

    componentDidMount() {
        this.filter_records();
    }

    set_search_phrase = (event) => {
        this.setState({search_phrase: event.target.value});
    }

    set_filter_phrase = (event) => {
        this.setState({filter_phrase: event.target.value});
    }

    set_date_from = (event) => {
        this.setState({min_date: event.target.value});
    }

    set_date_to = (event) => {
        this.setState({max_date: event.target.value});
    }

    set_time_from = (event) => {
        this.setState({min_time: event.target.value});
    }

    set_time_to = (event) => {
        this.setState({max_time: event.target.value});
    }

    filter_records = () => {
        const searchString = new URLSearchParams(window.location.search);
        this.setState({name: searchString.get('name'), id: searchString.get('search')});

        axios({
            method: 'post',
            url: `http://localhost:3001/group/graph/${searchString.get('search')}`,
            data: {
                text: this.state.filter_phrase,
                min_date: this.state.min_date,
                max_date: this.state.max_date,
                min_time: this.state.min_time,
                max_time: this.state.max_time
            }
        }).then(res => {
            let id_arr = [];
            let count_arr = [];
            res.data.map(point => {id_arr.push(point._id); count_arr.push(point.count_comments);});
            data.datasets[0].data = count_arr;
            data.labels = id_arr;

            this.setState({isLoading: false});

            if (typeof myChart !== "undefined") myChart.destroy();
            const myChartRef = this.chartRef.current.getContext("2d");
            myChart = new Chart(myChartRef, {
                type: "bar",
                data: data,
                options: options
            });
        });
    }

    search_phrase = () => {
        window.location.assign(`http://localhost:3000/phrase?id=${this.state.id}&text=${this.state.search_phrase}`);
    }

    set_row_count = (event) => {
        this.setState({buf_row_count: parseInt(event.target.value)});
    }

    resize_table = () => {
        this.setState({row_count: this.state.buf_row_count});
    }

    render = () => {
        if (this.state.isLoading){
            return(<><span className={styles.loading}>Загрузка. Подождите...</span></>);
        }

        return(
            <>
                <div className={styles.title}>{this.state.name}</div>
                <div className={styles.phrase_row}>
                    <input type="text" className={styles.phrase_input} placeholder="Введите ключевую фразу" onChange={this.set_search_phrase}/>
                    <button className={styles.search_button} onClick={this.search_phrase}>Поиск</button>
                </div>

                <div className={styles.row}>
                    <div className={styles.chart_wrap}>
                        <canvas ref={this.chartRef} id={styles.chart}/>
                    </div>

                    <div className={styles.filter_col}>
                        <span className={styles.filter_title}>Фильтр отображения</span>

                        <div className={styles.filter_row}>
                            <span>От</span>
                            <input type="date" className={styles.date_from} value={this.state.min_date} onChange={this.set_date_from}/>
                            <span>До</span>
                            <input type="date" className={styles.date_to} value={this.state.max_date} onChange={this.set_date_to}/>
                        </div>

                        <div className={styles.filter_row}>
                            <span>От</span>
                            <input type="time" className={styles.time_from} value={this.state.min_time} onChange={this.set_time_from}/>
                            <span>До</span>
                            <input type="time" className={styles.time_to} value={this.state.max_time} onChange={this.set_time_to}/>
                        </div>

                        <input type="text" className={styles.phrase_filter_input} placeholder="Ключевая фраза" onChange={this.set_filter_phrase}/>
                        <button className={styles.button} onClick={this.filter_records}>Применить</button>
                    </div>
                </div>

                <div className={styles.title_users}>Таблица активных комментаторов</div>
                <div className={styles.users_row}>
                    <div className={styles.table_wrap}>
                        <Table id={this.state.id} row_count={this.state.row_count}/>
                    </div>
                    <div className={styles.col}>
                        <input type="number" className={styles.row_count_input} placeholder="Число строк таблицы" onChange={this.set_row_count}/>
                        <button className={styles.button} onClick={this.resize_table}>Применить</button>
                    </div>
                </div>
            </>
        );
    }
}

export default Group;
