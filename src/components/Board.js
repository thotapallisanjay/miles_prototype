import React, { Component } from 'react';
import './Board.css';
import List from './List';

export default class Board extends Component {
  constructor(props) {
    super(props);

     //if there's a localStorage set that to state else use the hardcoded one
        if(localStorage.getItem('lists')) {
          const rawLS = localStorage.getItem('lists');
          const parsedLS = JSON.parse(rawLS);
          this.state = { lists: parsedLS }
        }
        else {
      this.state = {
        lists: [
          {
            title: 'Rewards',
            id: 0,
            cards: [{
              rewardText: 'R1',
              listNumber: 0,
              rewardId: 0
            }, 
            {
              rewardText: 'R2',
              listNumber: 0,
              rewardId: 1
            },
             {
               rewardText: 'R3',
               listNumber: 0,
               rewardId: 2
             },
              {
                rewardText: 'R4',
                listNumber: 0,
                rewardId: 3
              },
               {
                 rewardText: 'R5',
                 listNumber: 0,
                 rewardId: 4
               }]
          },
          {
            title: 'C1',
            id: 1,
            cards: []
          },
          {
            title: 'C2',
            id: 2,
            cards: []
          },
          {
            title: 'C3',
            id: 3,
            cards: []
          },
          {title: 'C4',
           id: 4,
           cards: []
          },
         {
         title: 'C5',
          id: 5,
          cards: []
         }
        ]
      }
      localStorage.setItem('lists', JSON.stringify(this.state.lists))
  }

}
  onCardCloseClick = (card) => {
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);
    const indexOfCard = parsedLS[card.listNumber].cards.findIndex(oldCard => oldCard.rewardId == card.rewardId)
    parsedLS[card.listNumber].cards.splice(indexOfCard, 1)
    this.setState({
          lists: parsedLS
        });
    localStorage.setItem('lists', JSON.stringify(parsedLS));

  }

  //get id of item being dragged and the list from where it's coming from
  onDragStart = (e, fromList) => {
    const dragInfo = {
      rewardId: e.currentTarget.id,
      fromList: fromList
    }
    localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, listNum) => {
    //get the dropped task card, the localStorage, 
    const droppedTask = localStorage.getItem('dragInfo');
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);
    const parsedDragInfo = JSON.parse(droppedTask)

    //get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    const cardsArray = parsedLS[parsedDragInfo.fromList].cards
    const taskCard = cardsArray.find(card => card.rewardId == parsedDragInfo.rewardId)

    //A reward can also be dragged between the swimlanes. In such a case, the reward gets removed from the former swimlane.
    if (parsedDragInfo.fromList !== "0"){
        const indexOfCard = cardsArray.findIndex(card => card.rewardId == parsedDragInfo.rewardId)
        parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1)
    }

    // ensures that duplicate rewards dont get listed under same category.
    const existing = parsedLS[listNum].cards.findIndex(card => card.rewardId == parsedDragInfo.rewardId)
    if (existing <0){
        parsedLS[listNum].cards.push({...taskCard, listNumber: parseInt(listNum)})

    }

    //sync the state and localStorage
    this.setState({
      lists: parsedLS
    });
    localStorage.setItem('lists', JSON.stringify(parsedLS));

  }

    render() {
      const lists = this.state.lists.map((list, index) => (
      <div className="list-boundary">
        <div className="list-wrapper" key={index}>
          <List {...list}
            onCardCloseClick = {this.onCardCloseClick.bind(this)}
            onAdd={(rewardText, listNumber) => this.addTaskCard(rewardText, listNumber)}
            onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e, listNum) => {this.onDrop(e, `${list.id}`)}}
          />
        </div>
        </div>
    ));

  return (
    <div className="board">
      <div className="lists">
        {lists}
      </div>
    </div>
  );
  }
}