import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.module.css'

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <>
                <tr><td className={styles.surname_td}><span>{this.props.comment.last_name}</span></td>
                    <td className={styles.name_td}><span>{this.props.comment.first_name}</span></td>
                    <td className={styles.comment_td}><span>{this.props.comment.text}</span></td>
                    <td className={styles.time_td}><span>{this.props.comment.time}</span></td>
                    <td className={styles.date_td}><span>{this.props.comment.date}</span></td>
                    <td className={styles.likes_count_td}><span>{this.props.comment.likes_count}</span></td>
                </tr>
            </>
        )
    }
}

export default Row;
