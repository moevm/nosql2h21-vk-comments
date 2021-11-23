import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.module.css';

class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.comment.last_name !== this.props.comment.last_name)
            return true;
        if (nextProps.comment.first_name !== this.props.comment.first_name)
            return true;
        if (nextProps.comment.text !== this.props.comment.text)
            return true;
        if (nextProps.comment.time !== this.props.comment.time)
            return true;
        if (nextProps.comment.date !== this.props.comment.date)
            return true;
        if (nextProps.comment.likes_count !== this.props.comment.likes_count)
            return true;
        return false;
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
