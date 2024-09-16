import styles from "./Card.module.css"

type CardProps = {
  id: number;
  content: string;
  handleChoice: () => void;
  flipped: boolean;
}

const Card = ({ card, handleChoice, flipped }: CardProps) => {

  const handleCardSelection = () => {
    if(!flipped) {
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