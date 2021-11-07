import React from 'react';
import PropTypes from 'prop-types';
import './DebugUsersTableRow.css';

class DebugUsersTableRow extends React.Component{
    constructor(props){
        super(props);
    }

    render = () => {
        return(
        <>
            <tr><td className='surname_td'><span>{this.props.user.last_name}</span></td>
                <td className='name_td'><span>{this.props.user.first_name}</span></td>
                <td className='age_td'><span>{this.props.user.age}</span></td>
                <td className='city_td'><span>{this.props.user.town}</span></td>
            </tr>
        </>
        )
    }
}

DebugUsersTableRow.propTypes = {};

DebugUsersTableRow.defaultProps = {};

export default DebugUsersTableRow;
