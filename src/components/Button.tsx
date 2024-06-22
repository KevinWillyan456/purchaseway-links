import { CiCirclePlus } from 'react-icons/ci'
import './Button.css'

interface ButtonProps {
    text: string
    icon: 'plus' | 'none'
}

function Button({ text, icon }: ButtonProps) {
    return (
        <button className="button">
            {text}
            {icon === 'plus' ? <CiCirclePlus /> : null}
        </button>
    )
}

export default Button
