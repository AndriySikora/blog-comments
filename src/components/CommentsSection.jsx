import React, { Component } from 'react';

import CommentsData from '../firebase-connection';
import NewListComments from './NewListComments';


class CommentsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentItem: [],
            displayName: '',
            message: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.setCommentToLocalStorage = this.setCommentToLocalStorage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.firebaseRef = CommentsData;
        this.firebaseRef.on('value', (commentsList) => {

            let commentItem = [];

            commentsList.forEach((commentsItem) => {
                const item = commentsItem.val();
                item['.key'] = commentsItem.key;
                commentItem.push(item);

            });

            console.log(JSON.parse(localStorage.getItem("savedComments")));

            this.setState({
                commentItem: commentItem
            });
        });
    }

    componentWillUnMount() {
        this.firebaseRef.off();
    }


    onChangeName(e) {
        this.setState({displayName: e.target.value});
    }

    onChangeMessage(e) {
        this.setState({message: e.target.value});
    }

    _isFormDataValid() {
        return this.state.displayName
            && this.state.displayName.trim().length !== 0
            && this.state.message
            && this.state.message.trim().length !== 0;
    }

    setCommentToLocalStorage() {

        let savedComments = JSON.parse(localStorage.getItem('savedComments')) || [];

        let comment = {
            displayName: this.state.displayName,
            message: this.state.message,
            date: (new Date()).toISOString()
        };

        savedComments.push(comment);

        localStorage.setItem('savedComments', JSON.stringify(savedComments));
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this._isFormDataValid()) {

            this.setCommentToLocalStorage();
            
            this.setState({
                displayName: '',
                message: ''
            });
        }
    }

    render() {
        return (
            <div className="container">
                <h3>Add new comments to blog</h3>
                <form className="comments-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="displayName">Your Name</label>
                        <input id="displayName" type="text" className="form-control" placeholder="Type your name..."
                               onChange={this.onChangeName } value={ this.state.displayName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Comment</label>
                        <textarea rows="4" id="message" type="text" className="form-control"
                                  placeholder="Type your comment..." onChange={this.onChangeMessage}
                                  value={this.state.message} />
                    </div>
                    <button className="btn btn-primary">{ 'Post comment ' + (this.state.commentItem.length) }</button>
                </form>
                <NewListComments commentItem={this.state.commentItem}/>
            </div>
        );
    }
}

export default CommentsSection;