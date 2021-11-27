import React from 'react';
import withRouter from "../../../utils/withRouter";
import axios from "axios";
import styles from './Comment.module.css'
import Table from "../../common/Table/Table";

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            commentId: props.params.commentId,
            userId: 0,
            userName: "",
            date: "",
            time: "",
            text: "",
            likers: [],
            isLoaded: false
        }
    }

    componentDidMount() {

        axios({
            method: 'get',
            url: `http://localhost:3001/comment/likers/${this.state.commentId}`
        }).then(({data}) => {
            console.log('Data:', data)
            if (data.length === 1) {
                data = data[0]
                this.setState({
                    userId: data.user._id,
                    userName: data.user.first_name + ' ' + data.user.last_name,
                    date: (new Date(data.date)).toLocaleDateString(),
                    time: data.time,
                    text: data.text,
                    likers: data.likers,
                    isLoaded: true
                })
            }
        })

    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <div className={styles.row}>
                        <a className={styles.user} href={`/users/${this.state.userId}`}>{this.state.userName}</a>
                        <div className={styles.time}>{this.state.time.substring(0, 5)}</div>
                        <div className={styles.date}>{this.state.date}</div>
                    </div>
                    <div className={styles.comment}>
                        {this.state.text}
                    </div>
                    <div className={styles.table_wrap}>
                        <Table headers={[
                            {
                                title: 'Комментарий понравился пользователям',
                                key: row => row['first_name'] + ' ' + row['last_name'],
                                link: row => `/users/${row['_id']}`
                            }
                        ]} rows={this.state.likers}/>
                    </div>
                </>
            )
        }
        else {
            return <></>
        }
    }

}

export default withRouter(Comment)
