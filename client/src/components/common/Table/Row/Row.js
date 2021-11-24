import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Table.module.css';
import {Link} from "react-router-dom";

class Row extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <tr>
                    {this.props.headers.map(({style, key, link}, index) =>
                        <td style={style} bgcolor='white' className={styles.td} key={index}><span>{
                            link ? <a href={link(this.props.row)}>{key(this.props.row)}</a> : key(this.props.row)
                        }</span></td>)}
                </tr>
            </>
        );
    }
}

export default Row;
