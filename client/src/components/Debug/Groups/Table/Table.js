import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';
import Row from './Row/Row'

class Table extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <table>
                    <thead><tr>
                        <td className={styles.name_td}><span>Группа</span></td>
                        <td className={styles.user_td}><span>Количество пользователей</span></td>
                        <td className={styles.comment_td}><span>Количество комментариев</span></td>
                    </tr></thead>

                    <tbody>
                        {this.props.groups.map(group => <Row key={group._id} group={group}></Row>)}
                    </tbody>
                </table>
            </>
        );
    }
}

export default Table;
