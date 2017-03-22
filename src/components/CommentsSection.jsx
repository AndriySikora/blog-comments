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
        this.setCommentsToLocalStorage = this.setCommentsToLocalStorage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrorName = this.handleErrorName.bind(this);
    }

    componentWillMount() {
        this.firebaseRef = CommentsData;
        let itemsFromLocalStorage = JSON.parse(localStorage.getItem('savedComments')) || [];

        const commentItem = [];

        itemsFromLocalStorage.map((itemsFromLocalStorage, index) => {
            let itemStorage = itemsFromLocalStorage;
            itemStorage['.key'] = index;
            commentItem.push(itemStorage);
        });

        this.firebaseRef.on('value', (commentsList) => {
            commentsList.forEach((commentsItem) => {
                let item = commentsItem.val();
                item['.key'] = commentsItem.key;
                commentItem.push(item);
            });

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
            && this.state.displayName !== 'admin'
            && this.state.displayName.trim().length !== 0
            && this.state.message
            && this.state.message.trim().length !== 0;
    }

    setCommentsToLocalStorage() {

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
            this.setCommentsToLocalStorage();

            let comments = this.state.commentItem.slice();

            comments.push({
                displayName : this.state.displayName,
                message: this.state.message,
                date: (new Date()).toISOString()
            });

            this.setState({
                displayName: '',
                message: '',
                commentItem: comments,
                errorMessage: ''
            });
        } else {
            return this.handleErrorName();
        }
    }

    handleErrorName() {
        this.setState({
            errorMessage: 'Please enter another name'
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Add new comments to blog</h3>
                <form className="comments-form" onSubmit={this.handleSubmit}>
                    <div className="form-group" value="valid">
                        <label htmlFor="displayName">Your Name</label>
                        <input id="displayName" type="text" className="form-control" placeholder="Type your name..."
                               onChange={this.onChangeName } value={this.state.displayName} />
                        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
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