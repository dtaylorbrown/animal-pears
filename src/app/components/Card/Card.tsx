import styles from "./Card.module.css"

export type CardType = {
  id?: number;
  src: string;
  matched: boolean;
}

type CardProps = {
  card: CardType
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card = ({ card, handleChoice, flipped, disabled }: CardProps) => {

  const handleCardSelection = () => {
    if(!disabled && !flipped) {
      handleChoice(card)
    }
  }

  return (
    <div className={styles.card} onClick={() => {handleCardSelection()} }>
      {!flipped && <span className={styles.cover}/>}
      <span className={styles.content}>{card.src}</span>
    </div>
  )
}

export default Card;