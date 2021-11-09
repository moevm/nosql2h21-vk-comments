import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';
import Row from './Row/Row'

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <>
                <table>
                    <thead><tr>
                        <td className={styles.surname_td}><span>Фамилия</span></td>
                        <td className={styles.name_td}><span>Имя</span></td>
                        <td className={styles.comment_td}><span>Комментарий</span></td>
                        <td className={styles.time_td}><span>Время комментария</span></td>
                        <td className={styles.date_td}><span>Дата комментария</span></td>
                        <td className={styles.likes_count_td}><span>Количество лайков</span></td>
                    </tr></thead>

                    <tbody>
                        {this.props.comments.map(comm => <Row key={comm._id} comment={comm}></Row>)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Table;
