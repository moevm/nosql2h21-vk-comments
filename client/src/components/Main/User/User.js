import React from 'react';
import withRouter from "../../../utils/withRouter";
import axios from "axios";
import styles from "./User.module.css"
import Table from "../../common/Table/Table";

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.params.userId,
            userName: "",
            likesCount: 0,
            likesByComments: 0,
            comments: [],
            friends: [],
            commentators: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        let statistics_req = axios({
            method: 'get',
            url: `http://localhost:3001/user/statistic/${this.state.userId}`
        }).then(({data}) => {
            if (data.length === 1) {
                data = data[0]
                this.setState({
                    userName: data.user.first_name + " " + data.user.last_name,
                    likesCount: data.count_likes,
                    likesByComments: Math.round(data.count_likes / data.count_comments * 100)/100
                })
            }
        })

        let friends_req = axios({
            method: 'get',
            url: `http://localhost:3001/user/friends/${this.state.userId}`
        }).then(({data}) => {
            this.setState({
                friends: data
            })
        })

        let comments_req = axios({
            method: 'get',
            url: `http://localhost:3001/user/comments/${this.state.userId}`
        }).then(({data}) => {
            this.setState({
                comments: data
            })
        })

        let commentators_req = axios({
            method: 'get',
            url: `http://localhost:3001/user/commentators/${this.state.userId}`
        }).then(({data}) => {
            this.setState({
                commentators: data
            })
        })

        Promise.all([
            statistics_req,
            friends_req,
            comments_req,
            commentators_req
        ]).then(() => {
            console.log(this.state)
            this.setState({
                isLoaded: true
            })
        })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <div className={styles.title}>{this.state.userName}</div>
                    <div className={styles.text}>Количество лайков: {this.state.likesCount}</div>
                    <div className={styles.text}>Количество лайков / Количество комментариев: {this.state.likesByComments}</div>

                    <div className={styles.table_title}>Комментарии пользователя</div>
                    <div className={styles.table_wrap}>
                        <Table headers={[
                            { title: 'Название группы', style: {'max-width': '250px'},
                                key: row => row['group']['title'],
                                link: row => `/group?search=${row.group._id}&name=${row.group.title}`
                            },
                            { title: 'Время', style: {'width': '100px', 'text-align': 'center', 'padding': '0'}, key: row => row['time']},
                            { title: 'Дата', style: {'width': '120px', 'text-align': 'center', 'padding': '0'}, key: row => (new Date(row['date'])).toLocaleDateString()},
                            { title: 'Комментарии', style: {'max-width': '500px'}, key: row => row['text']},
                            { title: 'Количество лайков', style: {'max-width': '120px', 'text-align': 'center', 'padding': '0'},
                                key: row => row['likes_count'],
                                link: row => `/comment/${row._id}`
                            }
                            ]} rows={this.state.comments}/>
                    </div>
                    <div className={styles.row}>
                        <div className={[styles.table_wrap, styles.friends_table].join(' ')}>
                            <Table headers={[
                                {
                                    title: 'Друзья',
                                    style: {'padding': '0 10px 0 10px'},
                                    key: row => row['first_name'] + ' ' + row['last_name'],
                                    link: row => `/users/${row['_id']}`
                                }
                            ]} rows={this.state.friends}/>
                        </div>

                        <div className={styles.table_wrap}>
                            <Table headers={[
                                {
                                    title: 'Связи по комментариям в одних группах',
                                    style: {'padding': '0 10px 0 10px'},
                                    key: row => row['first_name'] + ' ' + row['last_name'],
                                    link: row => `/users/${row['_id']}`
                                }
                            ]} rows={this.state.commentators}/>
                        </div>
                    </div>
                </>
            )
        } else {
            return (<></>)
        }
    }
}

export default withRouter(User);
