import Card from '../models/CardModel'

class CardService {
    public static list(): Card[] {
        const cards = localStorage.getItem('cards')
        return cards ? JSON.parse(cards) : []
    }

    public static find(id: string): Card | undefined {
        const cards = this.list()
        return cards.find((c) => c.id === id)
    }

    public static create(card: Card): void {
        const cards = this.list()

        if (cards.find((c) => c.id === card.id)) {
            throw new Error('Card already exists')
        }

        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    public static update(card: Card): void {
        const cards = this.list()
        const index = cards.findIndex((c) => c.id === card.id)
        cards[index] = card
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    public static delete(id: string): void {
        const cards = this.list()
        const index = cards.findIndex((c) => c.id === id)
        cards.splice(index, 1)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    public static deleteAll(): void {
        localStorage.removeItem('cards')
    }
}

export default CardService
