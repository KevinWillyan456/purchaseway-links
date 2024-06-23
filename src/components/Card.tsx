import { FaGear } from 'react-icons/fa6'
import './Card.css'
import CardModel from '../models/CardModel'

interface CardProps {
    card: CardModel
    openContextMenu: (event: React.MouseEvent<HTMLButtonElement>) => void
    setAnchorId: (id: string) => void
}

function Card({
    card: { title, body, url, id },
    openContextMenu,
    setAnchorId,
}: CardProps) {
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
            <button
                className="card-config"
                onClick={(e) => {
                    openContextMenu(e)
                    setAnchorId(id)
                }}
            >
                <FaGear />
            </button>
        </article>
    )
}

export default Card
