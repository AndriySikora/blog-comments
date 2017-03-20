import React, { Component } from 'react';

class CommentsItem extends Component {
    render() {
        const {id, displayName, date, message} = this.props;

        return (
            <li key={id} className="list-style">
                <div>
                    {displayName}
                </div>
                <div>
                    {message}
                </div>
                <div>
                   Date: <i>{date}</i>
                </div>
            </li>
        );
    }
}

export default CommentsItem;