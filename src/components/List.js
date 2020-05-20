import React from 'react';
import RewardCard from './RewardCard.js';
import './List.css';


export default class List extends React.Component {
  constructor(props) {
    super(props);
    }

    updateParent(value) {
       this.props.onCardCloseClick(value);
    }

  render() {
    const cards = this.props.cards.map((card, index) => {
      return ( 
        <li key={index}>
          <RewardCard {...card} updateParent={this.updateParent.bind(this)}
          onDragStart={this.props.onDragStart} />
        </li>
      );
    })
      
    return (
      <div>
        <h2 className={`name-header name-${this.props.id}`}>{this.props.title}</h2>
        <ul className="list" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {cards}
          <li className="add-list-wrapper">
          </li>
        </ul>
      </div>
    );
  }
  
}

