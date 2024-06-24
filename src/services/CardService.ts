import CardModel from '../models/CardModel'
import TypesOrderBy from '../models/TypesOrderBy'

class CardService {
    public static list(orderBy: TypesOrderBy = 'asc'): CardModel[] {
        if (!['asc', 'desc', 'date'].includes(orderBy)) {
            throw new Error(
                'Invalid orderBy value provided to CardService.list() method call. Valid values are: asc, desc, date. If you want to list all cards, just call the method without any arguments.'
            )
        }

        const cards = localStorage.getItem('cards')

        if (orderBy === 'asc') {
            return cards
                ? JSON.parse(cards).sort((a: CardModel, b: CardModel) =>
                      a.title.localeCompare(b.title)
                  )
                : []
        }

        if (orderBy === 'desc') {
            return cards
                ? JSON.parse(cards).sort((a: CardModel, b: CardModel) =>
                      b.title.localeCompare(a.title)
                  )
                : []
        }

        if (orderBy === 'date') {
            return cards
                ? JSON.parse(cards).sort(
                      (a: CardModel, b: CardModel) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                  )
                : []
        }

        return cards ? JSON.parse(cards) : []
    }

    public static find(id: string): CardModel | undefined {
        const cards = this.list()
        return cards.find((c) => c.id === id)
    }

    public static create(card: CardModel): void {
        const cards = this.list()

        if (cards.find((c) => c.id === card.id)) {
            throw new Error('Card id already exists')
        }

        if (cards.find((c) => c.title === card.title)) {
            throw new Error('Card title already exists')
        }

        if (cards.find((c) => c.url === card.url)) {
            throw new Error('Card url already exists')
        }

        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    public static update(card: CardModel): void {
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
