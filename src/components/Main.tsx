import Button from './Button'
import Card from './Card'
import './Main.css'

function Main() {
    return (
        <section className="main">
            <div className="title">Purchaseway Links</div>
            <Button text="Novo" icon="plus" />
            <Card />
        </section>
    )
}

export default Main
