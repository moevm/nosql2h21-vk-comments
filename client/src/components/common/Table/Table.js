import React from 'react';
import styles from './Table.module.css';
import Row from './Row/Row'

class Table extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <table>
                    <thead><tr>
                        {this.props.headers.map(({title, style}, index) => <td className={styles.td} style={style} key={index}><span>{title}</span></td>)}
                    </tr></thead>

                    <tbody>
                        {this.props.rows.map((row, index) => <Row key={index} row={row} headers={this.props.headers}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
