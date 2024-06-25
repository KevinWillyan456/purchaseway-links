import { ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import theme from './Mui/theme.ts'
import Main from './components/Main.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Main />
        </ThemeProvider>
    </React.StrictMode>
)
