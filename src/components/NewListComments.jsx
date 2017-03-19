import React, {Component} from 'react';
import CommentsData from '../firebase-connection';
import CommentsItem from  './CommentsItem';

class NewListComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentsOrder: 'asc'
        };

        this.orderByDate = this.orderByDate.bind(this);
        this.getSortedItems = this.getSortedItems.bind(this);
    };

    commentsItem(key) {
        let firebaseRef = CommentsData;
        firebaseRef.child(key).update();
    }

    orderByDate(listOrder) {
       this.setState({commentsOrder: listOrder.target.value});
    }

    getSortedItems() {

        if(this.state.commentsOrder === 'asc') {
                return this.props.commentItem.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                });
        }else{
            return this.props.commentItem.reverse((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            });
        }

    }

    render() {
        const sortedComments = this.getSortedItems();

        const commentsItem = sortedComments.map((item) => {
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
              <div>
                  <select value={this.state.commentsOrder} onChange={this.orderByDate}>
                      <option value={'acs'}>Oldest first</option>
                      <option value={'desc'}>Newest first</option>
                  </select>
              </div>
              <ul>
                  { commentsItem }
              </ul>
          </div>
        );
    }
}

export default NewListComments;
