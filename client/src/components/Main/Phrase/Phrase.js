import React from 'react';
import withRouter from "../../../utils/withRouter";
import axios from "axios";
import styles from "./Phrase.module.css"
import Table from "../../common/Table/Table";

class Phrase extends React.Component {

    constructor(props) {
        super(props);

        const params = new URLSearchParams(props.search);

        this.state = {
            groupId: params.get('id'),
            phraseText: params.get('text'),
            comments: [],
            isLoaded: false
        }
    }

    componentDidMount() {

        axios({
            method: 'post',
            url: `http://localhost:3001/comment/search/${this.state.groupId}`,
            data: {
                text: this.state.phraseText
            }
        }).then(res => {
            this.setState({
                comments: res.data,
                isLoaded: true
            })
        })

    }

    render() {
        if (this.state.isLoaded) {
            return (
            <>
                <div className={styles.title}>{this.state.phraseText}</div>
                <div className={styles.table_wrap}>
                    <Table headers={[
                        { title: 'Имя комментатора', style: {'max-width': '250px'}, key: row => row.user.first_name
                                + ' ' + row.user.last_name, link: row => `/users/${row.user['_id']}`},
                        { title: 'Время', style: {'width': '90px', 'text-align': 'center', 'padding': '0'}, key: row => row['time']},
                        { title: 'Дата', style: {'width': '110px', 'text-align': 'center', 'padding': '0'}, key: row => (new Date(row['date'])).toLocaleDateString()},
                        { title: 'Комментарии', style: {'max-width': '650px'}, key: row => row['text']},
                        { title: 'Количество лайков', style: {'width': '90px', 'text-align': 'center', 'padding': '0 10px'},
                            key: row => row['likes_count'],
                            link: row => `/comment/${row.comment_id}`
                        }
                    ]} rows={this.state.comments}/>
                </div>
            </>
            )
        } else {
            return <></>
        }
    }

}

export default withRouter(Phrase);
