import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Groups.module.css';

class Row extends React.Component{
    constructor(props) {
        super(props);

        this.toGroup.bind(this);
    }

    toGroup = (event) => {
        window.location.assign(`http://localhost:3000/group?search=${this.props.group._id}&name=${this.props.group.title}`);
    }

    render = () => {
        return(
            <tr>
                <td className={styles.td}><span onClick={this.toGroup}>{this.props.group.title}</span></td>
            </tr>
        );
    }
}

export default Row;
