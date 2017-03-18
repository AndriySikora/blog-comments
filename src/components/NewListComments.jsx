import React, {Component} from 'react';
import CommentsData from '../firebase-connection';
import CommentsItem from  './CommentsItem';

class NewListComments extends React.Component {

    commentsItem(key) {
        let firebaseRef = CommentsData;
        firebaseRef.child(key).update();
    }

    render() {
        const commentsItem = this.props.commentItem.map((item) => {
                return <CommentsItem
                    key={item['.key']}
                    id={item['.key']}
                    displayName={item.displayName}
                    date={item.date}
                    message={item.message}
                />
            }
        );

        return(
          <div className="wrapper-list">
              <div className="title">
                  New comments
              </div>
              <ul>
                  { commentsItem }
              </ul>
          </div>
        );
    }
}

export default NewListComments;
