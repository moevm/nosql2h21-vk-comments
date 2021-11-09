import React from 'react';
import PropTypes from 'prop-types';
import styles from './Debug.module.css';

class Debug extends React.Component {
    constructor(props) {
        super(props);
        this.toUsers.bind(this);
        this.toComments.bind(this);
    }

    toUsers = () => {
        window.location.assign('http://localhost:3000/debug/users');
    }


    toComments = () => {
        window.location.assign('http://localhost:3000/debug/comments');
    }

    render() {
        return(
        <>
            <div className={styles.title}>Страница для отладки</div>
            <div className={styles.button_row}>
                <button className={styles.button} onClick={this.toUsers}>Пользователи</button>
                <button className={styles.button} onClick={this.toComments}>Комментарии</button>
                <button className={styles.button}>Группы</button>
            </div>
        </>
        )
    }
}

export default Debug;
