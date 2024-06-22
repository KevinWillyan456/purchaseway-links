import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import './Main.css'
import CardService from '../services/CardService'
import CardModel from '../models/CardModel'

function Main() {
    const [cards] = useState<CardModel[]>(CardService.list())

    return (
        <section className="main">
            <div className="title">Purchaseway Links</div>
            <Button text="Novo" icon="plus" />
            <section className="container-cards">
                {cards.length === 0 && (
                    <div className="empty">Nenhum link cadastrado</div>
                )}

                {cards.map((data) => (
                    <Card
                        title={data.title}
                        body={data.body}
                        url={data.url}
                        key={data.id}
                    />
                ))}
            </section>
        </section>
    )
}

export default Main
