import React, {useState} from 'react';
import Button from './Button';
import List from './List';
// import "./App.css";

export type Card = {
    id: number;
    content: string;
    x: number;
    y: number;
    editing: boolean;
}

const Card = () => {
    const cardsList = [
        {id:1, content: 'sample1', x: 100, y: 100, editing: false},
        {id:2, content: 'sample2', x: 150, y: 150, editing: false},
    ]
    const [cards, setCards] = useState(cardsList);

    const createCard = (card: Card) => {

        //state
        setCards([...cards, card]);
    }

    const updateCard = (card: Card) => {
        const newCards = cards.map((_card) => {
            return _card.id === card.id ? {..._card, ...card} : {..._card}
        })
        setCards(newCards);
    }
    
    return (
        <div>
            <h2>board</h2>
            <List cards={cards} updateCard={updateCard}/>
            <Button createCard={createCard}/>
        </div>
    )
}

export default Card;