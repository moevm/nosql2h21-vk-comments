import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.module.css';

class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <tr><td className={styles.name_td}><span>{this.props.group.title}</span></td>
                    <td className={styles.user_td}><span>{this.props.group.users_count}</span></td>
                    <td className={styles.comment_td}><span>{this.props.group.comments_count}</span></td>
                </tr>
            </>
        );
    }
}

Row.propTypes = {};

Row.defaultProps = {};

export default Row;
