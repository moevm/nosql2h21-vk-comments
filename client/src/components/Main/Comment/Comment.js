import React from 'react';
import withRouter from "../../../utils/withRouter";
import axios from "axios";
import cs from "../../common/common.module.css"
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
                <div className={cs.w100}>
                    <div className={cs.center}>
                        <a className={cs.title} href={`/users/${this.state.userId}`}>{this.state.userName}</a>
                        <div className={[cs.vcenter, cs.mt30].join(' ')}>
                            <div className={[cs.text, cs.h30px].join(' ')}>{this.state.date}</div>
                        </div>
                        <div className={[cs.vcenter, cs.mt30].join(' ')}>
                            <div className={[cs.text, cs.h30px].join(' ')}>{this.state.time}</div>
                        </div>
                    </div>
                    <div className={cs.center}>
                        <div className={[cs.text, cs.w50].join(' ')}>
                            {this.state.text}
                        </div>
                    </div>
                    <div className={cs.center}>
                        <Table headers={[
                            {
                                title: 'Комментарий понравился пользователям',
                                key: row => row['first_name'] + ' ' + row['last_name'],
                                link: row => `/users/${row['_id']}`
                            }
                        ]} rows={this.state.likers}/>
                    </div>
                </div>
            )
        }
        else {
            return <></>
        }
    }

}

export default withRouter(Comment)
