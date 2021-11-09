import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.module.css'

class Row extends React.Component{
    constructor(props){
        super(props);
    }

    render = () => {
        return(
        <>
            <tr><td className={styles.surname_td}><span>{this.props.user.last_name}</span></td>
                <td className={styles.name_td}><span>{this.props.user.first_name}</span></td>
                <td className={styles.age_td}><span>{this.props.user.age}</span></td>
                <td className={styles.city_td}><span>{this.props.user.town}</span></td>
            </tr>
        </>
        )
    }
}

export default Row;
