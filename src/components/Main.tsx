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
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
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
    const handleCloseAddLink = () => setOpen(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [anchorId, setAnchorId] = useState<string>('')

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

        if (!url.match(/^(http|https):\/\//)) {
            setUrlError('URL inválida')
            return
        } else {
            setUrlError('')
        }

        if (CardService.list().find((c) => c.title === title)) {
            setTitleError('Título já existente')
            return
        } else {
            setTitleError('')
        }

        if (CardService.list().find((c) => c.url === url)) {
            setUrlError('URL já existente')
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

        handleCloseAddLink()
    }

    const openContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleEdit = () => {
        console.log('Edit action')
        handleClose()
    }

    const handleDelete = () => {
        CardService.delete(anchorId)
        setCards(CardService.list())
        setOpenDialog(false)
        handleClose()
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
        handleCloseMenu()
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
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
                    <Card
                        card={data}
                        key={data.id}
                        openContextMenu={openContextMenu}
                        setAnchorId={setAnchorId}
                    />
                ))}
            </section>

            <ThemeProvider theme={theme}>
                <Modal open={open} onClose={handleCloseAddLink}>
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
                                <Button type="submit">Salvar</Button>
                                <Button
                                    type="button"
                                    onClick={handleCloseAddLink}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: 'var(--darker-blue)',
                        },
                    }}
                >
                    <MenuItem
                        onClick={handleEdit}
                        style={{ color: 'var(--secondary-blue)' }}
                    >
                        Editar
                    </MenuItem>
                    <MenuItem
                        onClick={handleOpenDialog}
                        style={{ color: '#e90215' }}
                    >
                        Deletar
                    </MenuItem>
                </Menu>

                <Dialog
                    open={openDialog}
                    fullWidth
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: 'var(--darker-blue)',
                            color: 'var(--color-white)',
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        Confirmar deleção
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            sx={{ color: 'var(--color-white)' }}
                        >
                            Deseja mesmo deletar este link?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <Button onClick={handleDelete}>Deletar</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </section>
    )
}

export default Main
