import React, {Component} from 'react';
import CommentsItem from  './CommentsItem';

class NewListComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentsOrder: 'asc'
        };

        this.orderByDate = this.orderByDate.bind(this);
        this.getSortedItems = this.getSortedItems.bind(this);
        this.getAscendingSort = this.getAscendingSort.bind(this);
        this.getDescendingSort = this.getDescendingSort.bind(this);
    };

    orderByDate(listOrder) {
       this.setState({commentsOrder: listOrder.target.value});
    }


    getSortedItems() {

        if(this.state.commentsOrder === 'asc') {
            return this.getAscendingSort();
        }else{
            return this.getDescendingSort();
        }
    }

    getAscendingSort() {
        return this.props.commentItem.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
    }

    getDescendingSort() {
        return this.props.commentItem.reverse((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
    }

    render() {
        const sortedComments = this.getSortedItems();

        const commentsItem = sortedComments.map((item) => {
                return <CommentsItem
                    key={item['.key']}
                    id={item['.key']}
                    displayName={item.displayName}
                    message={item.message}
                    date={item.date}
                />
            }
        );

        return(
          <div className="wrapper-list">
              <div className="title">
                  Comments
              </div>
              <div className="form-group">
                  <select value={this.state.commentsOrder} onChange={this.orderByDate}
                          className="form-control">
                      <option value={'acs'}>Oldest first</option>
                      <option value={'desc'}>Newest first</option>
                  </select>
              </div>
              <ul className="list-unstyled">
                  { commentsItem }
              </ul>
          </div>
        );
    }
}

export default NewListComments;
