import React from 'react';
import PropTypes from 'prop-types';
import styles from './Groups.module.css';
import axios from 'axios';
import GroupRow from './Row/Row';

class Group extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: "",
            groups: [''],
            isLoaded: false,
        };
    }

    componentDidMount() {
        const searchString = new URLSearchParams(window.location.search);
        this.setState({group: searchString.get('search')});

        axios({
            method: 'post',
            url: 'http://localhost:3001/group/search',
            data: {title: searchString.get('search')}
        }).then(res => {
            this.setState({groups: res.data, isLoaded: true});
            }
        );
    }

    render = () => {
        if (!this.state.isLoaded)
            return(<></>);
        if (this.state.groups.length === 0)
            return(<><span className={styles.loading}>Ни одной группы не найдено</span></>);
        return(
            <div className={styles.table_wrap}>
                <table className={styles.table}>
                    <thead>
                        <tr><td>Группы</td></tr>
                    </thead>
                    <tbody>
                        {this.state.groups.map(group => <GroupRow key={group._id} group={group}></GroupRow>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Group;
