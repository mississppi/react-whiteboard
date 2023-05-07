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
import { 
    createCard as createCardMutation,
    updateCard as updateCardMutation
} from "./graphql/mutations";
import { GraphQLResult } from '@aws-amplify/api';

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
        {id:2, content: 'sample2', x: 120, y: 130, editing: false},
    ]

    //4件
    const [cards, setCards] = useState(cardsList);
    // const [cards, setCards] = useState([{}]);

    useEffect(() => {
        console.log("effect:start");
        fetchCards();
    }, []);

    async function fetchCards() {
        const apiData:GraphQLResult<any> = await API.graphql({ query: listCards });
        const raw_cards = apiData.data.listCards.items;
        // setCards([...cards, raw_cards]);
        // console.log(raw_cards);
        // setCards([...cards, raw_cards]);
        Object.keys(raw_cards).map((k, i) => {
            let data = {
                id: parseInt(raw_cards[i].id),
                content: raw_cards[i].content,
                x: raw_cards[i].x,
                y: raw_cards[i].y,
                editing: raw_cards[i].editing,
            }
            // setCards([...cards, data]);
            cards.push(data);
            setCards([...cards]);
        })
        // console.log(cards);
        // setCards(cards);

        // const d:any = Object.keys(raw_cards).map((k, i) => {
        //     let data = {
        //         id: parseInt(raw_cards[i].id),
        //         content: raw_cards[i].content,
        //         x: raw_cards[i].x,
        //         y: raw_cards[i].y,
        //         editing: raw_cards[i].editing,
        //     }
        //     return data;
        // })
    }

    async function createCard(card: Card) {
        await API.graphql({
            query: createCardMutation,
            variables: {input: card}
        })
        fetchCards();
    }

    async function updateCard(card: Card) {
        // const newCards   = cards.map((_card) => {
        //     return _card.id === card.id ? {..._card, ...card} : {..._card}
        // })
        console.log(card);
        await API.graphql({
            query: updateCardMutation,
            variables: {input: card}
        })
        fetchCards();
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