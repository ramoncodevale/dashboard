import React from "react"

type Card = {
  id: string
  title: string
  content: string
}

type CarouselProps = {
  cards: Card[]
  sectionId: string
  onRemoveCard: (cardId: string) => void
  onEditCard: (cardId: string) => void
}

const Carousel: React.FC<CarouselProps> = ({
  cards,
  sectionId,
  onRemoveCard,
  onEditCard,
}) => {
  return (
    <div>
      {cards.map((card, index) => (
        <div key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.content}</p>
          <button onClick={() => onRemoveCard(card.id)}>Remove</button>
          <button onClick={() => onEditCard(card.id)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

export default Carousel
