'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Card from "./components/Card/Card";
import type { CardType } from "./components/Card/Card";

const fruitCards: CardType[] = [
  { src: '🍐', matched: false }, 
  { src: '🍓', matched: false }, 
  { src: '🍇', matched: false }, 
  { src: '🥑', matched: false }, 
  { src: '🍊', matched: false }, 
  { src: '🥭', matched: false }, 
  { src: '🍉', matched: false }, 
  { src: '🥥', matched: false }
];

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);

  const shuffleCards = () => {
    const shuffledCards = [...fruitCards, ...fruitCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setCards(shuffledCards);
    setTurns(0)
  }

  const handleChoice = (card: CardType) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setTurns(prevTurns => prevTurns + 1);
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
    }, 500)
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Simple Pears</h1>
        <h2>Turns: {turns}</h2>
        <div className={styles.game}>
          {cards.map((card) => {
            return (
              <Card 
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}
