import React from 'react';
import './RewardCard.css';

export default class RewardCard extends React.Component {

    constructor(props) {
        super(props);

     }

    handleClick(event) {
            this.props.updateParent(this.props);
        }

    render(){
       return (
        <div className="task-card-wrapper" draggable="true" id={[this.props.rewardId]} onDragStart={this.props.onDragStart}>
             <div className="task-card-close" onClick={this.handleClick.bind(this)}>
                   x
              </div>
           <div className="task-card">
          {this.props.rewardText}
          </div>
        </div>
      )
}

};

