import { FaGear } from 'react-icons/fa6'
import './Card.css'

interface CardProps {
    title: string
    body: string
    url: string
}

function Card({ title, body, url }: CardProps) {
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
