import React from 'react';
import withRouter from "../../../utils/withRouter";
import axios from "axios";
import cs from "../../common/common.module.css"
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
            <div>
                <div className={cs.center}>
                    <div className={cs.title}>{this.state.phraseText}</div>
                </div>
                <div className={cs.mt10}>
                    <Table headers={[
                        { title: 'Имя комментатора', style: {'max-width': '250px'}, key: row => row.user.first_name
                                + ' ' + row.user.last_name, link: row => `/users/${row.user['_id']}`},
                        { title: 'Время', key: row => row['time']},
                        { title: 'Дата', key: row => (new Date(row['date'])).toLocaleDateString()},
                        { title: 'Комментарии', style: {'max-width': '450px'}, key: row => row['text']},
                        { title: 'Количество лайков', style: {'max-width': '100px'}, key: row => row['likes_count']}
                    ]} rows={this.state.comments}/>
                </div>
            </div>
            )
        } else {
            return <></>
        }
    }

}

export default withRouter(Phrase);
