import { CiCirclePlus } from 'react-icons/ci'
import './Button.css'
import { ReactNode } from 'react'

interface ButtonProps {
    icon: 'plus' | 'none'
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    children?: ReactNode
}

function Button({ icon, type, children, onClick }: ButtonProps) {
    return (
        <button className="button" onClick={onClick} type={type}>
            {icon === 'plus' ? <CiCirclePlus /> : null}
            {children}
        </button>
    )
}

export default Button
