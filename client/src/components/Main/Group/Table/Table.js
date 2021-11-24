import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';
import axios from "axios";

class Table extends React.Component{
    isFirst = true;

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.toUser.bind(this);
    }

    toUser = (event) => {
        window.location.assign(`http://localhost:3000/users/${event}`);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.isFirst) {
            this.isFirst = false;
            return true;
        }
        if (this.state.data.length === nextState.data.length && nextProps.row_count === this.props.row_count)
            return false;
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        axios({
            method: 'get',
            url: `http://localhost:3001/group/commentators/${this.props.id}/${this.props.row_count}`,
        }).then(res => {
            this.setState({data: res.data});
        });
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:3001/group/commentators/${this.props.id}/${this.props.row_count}`,
        }).then(res => {
            this.setState({data: res.data});
        });
    }


    render = () => {
        return(
            <table>
                <thead><tr>
                    <td className={styles.name_td}><span>Имя комментатора</span></td>
                    <td className={styles.comments_td}><span>Число комментариев</span></td>
                </tr></thead>
                <tbody>
                    {this.state.data.map(user =>
                        <tr key={user._id._id}>
                            <td className={styles.name_td}><span onClick={()=>this.toUser(user._id._id)}>{user._id.first_name} {user._id.last_name}</span></td>
                            <td className={styles.comments_td}><span>{user.count_comments}</span></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default Table;
