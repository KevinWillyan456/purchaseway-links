import { useState } from 'react'
import Button from './Button'
import Card from './Card'
import './Main.css'
import CardService from '../services/CardService'
import CardModel from '../models/CardModel'
import React from 'react'
import {
    Modal,
    Box,
    TextField,
    Typography,
    ThemeProvider,
    createTheme,
} from '@mui/material'

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        backgroundColor: 'var(--color-white)',
                        borderRadius: '5px',
                        color: 'var(--darker-blue)',
                    },
                },
            },
        },
    },
})

function Main() {
    const [cards, setCards] = useState<CardModel[]>(CardService.list())

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [body, setBody] = useState('')
    const [titleError, setTitleError] = useState('')
    const [urlError, setUrlError] = useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title) {
            setTitleError('Campo obrigatório')
            return
        } else {
            setTitleError('')
        }

        if (!url) {
            setUrlError('Campo obrigatório')
            return
        } else {
            setUrlError('')
        }

        CardService.create({
            id: Math.random().toString(36).substr(2, 9),
            title,
            url,
            body,
            createdAt: new Date().toISOString(),
        })

        setCards(CardService.list())

        setTitle('')
        setUrl('')
        setBody('')

        handleClose()
    }

    return (
        <section className="main">
            <div className="title">Purchaseway Links</div>
            <Button icon="plus" onClick={handleOpen}>
                Novo
            </Button>

            <section className="container-cards">
                {cards.length === 0 && (
                    <div className="empty">Nenhum link cadastrado</div>
                )}

                {cards.map((data) => (
                    <Card card={data} key={data.id} />
                ))}
            </section>

            <ThemeProvider theme={theme}>
                <Modal open={open} onClose={handleClose}>
                    <Box className="model-create">
                        <Typography variant="h6" component="h2">
                            Adicionar link
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Título"
                                value={title}
                                className="model-create-input"
                                onChange={(e) => setTitle(e.target.value)}
                                variant="filled"
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                                error={!!titleError}
                                helperText={titleError}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                variant="filled"
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                                error={!!urlError}
                                helperText={urlError}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Descrição"
                                multiline
                                rows={4}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                variant="filled"
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                            />
                            <Box
                                mt={2}
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Button icon="none" type="submit">
                                    Salvar
                                </Button>
                                <Button
                                    icon="none"
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </ThemeProvider>
        </section>
    )
}

export default Main
