import React from 'react';
import PropTypes from 'prop-types';
import './DebugUsersTable.css';
import DebugUsersTableRow from '../DebugUsersTableRow/DebugUsersTableRow'

class DebugUsersTable extends React.Component {
    constructor(props){
        super(props);
    }

    render = () => {
        return(
        <>
            <table>
                <thead><tr>
                    <td className='surname_td'><span>Фамилия</span></td>
                    <td className='name_td'><span>Имя</span></td>
                    <td className='age_td'><span>Возраст</span></td>
                    <td className='city_td'><span>Город</span></td>
                </tr></thead>

                <tbody>
                    {this.props.users.map(user => <DebugUsersTableRow key={user._id} user={user}></DebugUsersTableRow>)}
                </tbody>
            </table>
        </>
        )
    }
}

export default DebugUsersTable;
