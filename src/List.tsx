import React, {useState} from 'react';
import {Card} from './Card';

type ListProps = {
    cards: Card[];
    updateCard: Function;
}

const List: React.FC<ListProps> = ({cards, updateCard}) => {
    const [dragging, setDragging] = useState(
        {id: 0, content: "", x:0 , y:0, editing: false}
    );
    const changePos = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const newCard = {
            ...dragging,
            x: e.clientX,
            y: e.clientY,
            editing: false,
        }
        updateCard(newCard);
    }
    return (
        <div
            style={{ width: "1000px", height: "1000px", position: "relative"}}
            onDrop={(e) => changePos(e)}
            onDragOver={(e) => e.preventDefault()}
        >
            {cards.map((card) => {
                return (
                    <div
                        key={card.id}
                        style={{position: "absolute", top: card.y + "px", left: card.x + "px"}}
                        onDragStart={(e) => setDragging(card)}
                    >
                    <span draggable={true}>{card.content}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default List;