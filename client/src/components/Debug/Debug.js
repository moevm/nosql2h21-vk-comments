import React from 'react';
import PropTypes from 'prop-types';
import styles from './Debug.css';

class Debug extends React.Component {
    constructor(props) {
        super(props);
        this.toUsers = this.toUsers.bind();
    }

    toUsers = () => {
        window.location.assign('http://localhost:3000/debug/users');
    }

    render() {
        return(
        <>
            <div className="title">Страница для отладки</div>
            <div className="button_row">
                <button onClick={this.toUsers}>Пользователи</button>
                <button>Комментарии</button>
                <button>Группы</button>
            </div>
        </>
        )
    }
}

export default Debug;
