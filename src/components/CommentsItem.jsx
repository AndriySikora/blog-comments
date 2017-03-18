import React, { Component } from 'react';

class CommentsItem extends Component {
    render() {
        const {id, displayName, date, message} = this.props;

        return (
            <li key={id}>
                <div>
                    {displayName}
                </div>
                <div>
                    {message}
                </div>
                <div>
                    <i>{date}</i>
                </div>
            </li>
        );
    }
}

export default CommentsItem;