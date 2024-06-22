import { FaGear } from 'react-icons/fa6'
import './Card.css'
import CardModel from '../models/CardModel'

interface CardProps {
    card: CardModel
}

function Card({ card: { title, body, url } }: CardProps) {
    return (
        <article className="card">
            <div className="card-title">{title}</div>
            <div className="card-body">
                <p>{body}</p>
            </div>
            <div className="card-url">
                <a href={url} target="_blank" rel="noreferrer">
                    Abrir link
                </a>
            </div>
            <div className="card-config">
                <FaGear />
            </div>
        </article>
    )
}

export default Card
