import React, {useState, useEffect} from 'react';
import Button from './Button';
import List from './List';
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
    // Button,
    Flex,
    Heading,
    Text,
    TextField,
    View,
    withAuthenticator,
} from "@aws-amplify/ui-react";
import { listCards } from "./graphql/queries";


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
    ]

    const [cards, setCards] = useState(cardsList);
    // const [cards, setCards] = useState([{}]);

    useEffect(() => {
        fetchCards();
    }, []);

    async function fetchCards() {
        const apiData = await API.graphql({ query: listCards });
        console.log(apiData);
        // const cardsFromAPI = apiData.data.listCards.items;
    }

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