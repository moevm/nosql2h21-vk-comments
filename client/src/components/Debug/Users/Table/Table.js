import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';
import DebugUsersTableRow from './Row/Row'

class Table extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        return(
        <>
            <table>
                <thead><tr>
                    <td className={styles.surname_td}><span>Фамилия</span></td>
                    <td className={styles.name_td}><span>Имя</span></td>
                    <td className={styles.age_td}><span>Возраст</span></td>
                    <td className={styles.city_td}><span>Город</span></td>
                </tr></thead>

                <tbody>
                    {this.props.users.map(user => <DebugUsersTableRow key={user._id} user={user}></DebugUsersTableRow>)}
                </tbody>
            </table>
        </>
        )
    }
}

export default Table;
