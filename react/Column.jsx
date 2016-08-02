import React from 'react';
import Card from './Card.jsx';

var Column = React.createClass({
  getDefaultProps() {
    return {
      data: [],
    };
  },
  render() {
    var cards = this.createByColumn(this.props.data);
    return (
      <div className="container column-holder">
        <div id="Queue" className="column">
          {cards[0]}
        </div>
        <div id="InProgress" className="column">
          {cards[1]}
        </div>
        <div id="Done" className="column">
          {cards[2]}
        </div>
      </div>
    )
  },
  createByColumn(data) {
    var queueArr = [];
    var inProgressArr = [];
    var doneArr = [];
    data.forEach( (e,i,a) => {
      switch(e.status) {
        case 'Queue':
          queueArr.push(
            <Card key={i} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'In Progress':
          inProgressArr.push(
            <Card key={i} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
        case 'Done':
          doneArr.push(
            <Card key={i} updateBoard={this.props.updateBoard} data={e} />
          )
          break;
      }
    });
    return [queueArr, inProgressArr, doneArr];
  },
});

export default Column;