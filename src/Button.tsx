import React, {useState} from 'react';
import Card from './Card';

type ButtonProps = {
    createCard: Function;
}

const Button: React.FC<ButtonProps> = ({createCard}) => {
    const addCard = () => {
        const newCard = {
            id: Math.floor(Math.random() * 1e5),
            content: '新規カード' + Math.floor(Math.random() * 1e5),
            x: 50,
            y: 50,
            editing: false,
        }
        createCard(newCard);
    }
    return (
        <button onClick={() => addCard()}>new card</button>
    )
}

export default Button;