import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.module.css';

import axios from "axios";

class Main extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            group: "",
            isImporting: false,
            isExporting: false
        }

        this.find_group.bind(this);
        this.import_db.bind(this);
        this.export_db.bind(this);
        this.set_group_name.bind(this);
    }

    find_group = (event) => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/group/search',
            data: {title: this.state.group}
        }).then(res => {
                console.log(res);
            }
        );
        // window.location.assign("http://localhost:3001/group")
    }

    import_db = (event) => {
        this.setState({isImporting: true});

        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            axios({
                method: 'post',
                url: 'http://localhost:3001/db/import',
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                data: JSON.parse(reader.result)
            }).then(res => {
                    this.setState({isImporting: false});
                }
            );
        }.bind(this);
    }

    export_db = () => {
        this.setState({isExporting: true});
        const download = (path, filename) => {
            // Create a new link
            const anchor = document.createElement('a');
            anchor.href = path;
            anchor.download = filename;

            // Append to the DOM
            document.body.appendChild(anchor);

            // Trigger `click` event
            anchor.click();

            // Remove element from DOM
            document.body.removeChild(anchor);
        };

        axios({
            method: 'get',
            url: 'http://localhost:3001/db/export',
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        }).then(res => {
                console.log(res);
                const blob = new Blob([JSON.stringify(res.data)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                this.setState({isExporting: false});
                download(url, 'vk_dump.json');
                URL.revokeObjectURL(url);
            }
        );
    }

    set_group_name = (event) => {
        this.setState({group: event.target.value});
    }

    render = () => {
        if (this.state.isImporting)
            return(<><span className={styles.loading}>Импорт. Подождите...</span></>);
        else if (this.state.isExporting)
            return(<><span className={styles.loading}>Экспорт. Подождите...</span></>);
        return(
            <>
                <div className={styles.row}>
                    <input type="text" className={styles.input}  onChange={this.set_group_name} placeholder="Введите название группы"/>
                    <button onClick={this.find_group} className={styles.search_button}>Поиск</button>
                </div>
                <input type="file" className={styles.input_import} onChange={this.import_db}/>
                <button onClick={this.export_db} className={styles.export_button}>Экспорт базы данных</button>
            </>
        );
    }
}

export default Main;
