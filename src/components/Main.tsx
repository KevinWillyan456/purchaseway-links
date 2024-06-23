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

    const [openAddLink, setOpenAddLink] = useState<boolean>(false)
    const [openEditLink, setOpenEditLink] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [titleEdit, setTitleEdit] = useState<string>('')
    const [urlEdit, setUrlEdit] = useState<string>('')
    const [bodyEdit, setBodyEdit] = useState<string>('')
    const [titleErrorAddLink, setTitleErrorAddLink] = useState<string>('')
    const [urlErrorAddLink, setUrlErrorAddLink] = useState<string>('')
    const [titleErrorEditLink, setTitleErrorEditLink] = useState<string>('')
    const [urlErrorEditLink, setUrlErrorEditLink] = useState<string>('')

    const handleOpenAddLink = () => setOpenAddLink(true)
    const handleCloseAddLink = () => setOpenAddLink(false)

    const handleOpenEditLink = () => {
        const card = CardService.find(anchorId)
        setTitleEdit(card?.title || '')
        setUrlEdit(card?.url || '')
        setBodyEdit(card?.body || '')
        setOpenEditLink(true)
    }
    const handleCloseEditLink = () => setOpenEditLink(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [anchorId, setAnchorId] = useState<string>('')

    const handleAddLink = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title) {
            setTitleErrorAddLink('Campo obrigatório')
            return
        } else {
            setTitleErrorAddLink('')
        }

        if (!url) {
            setUrlErrorAddLink('Campo obrigatório')
            return
        } else {
            setUrlErrorAddLink('')
        }

        if (!url.match(/^(http|https):\/\//)) {
            setUrlErrorAddLink('URL inválida')
            return
        } else {
            setUrlErrorAddLink('')
        }

        if (CardService.list().find((c) => c.title === title)) {
            setTitleErrorAddLink('Título já existente')
            return
        } else {
            setTitleErrorAddLink('')
        }

        if (CardService.list().find((c) => c.url === url)) {
            setUrlErrorAddLink('URL já existente')
            return
        } else {
            setUrlErrorAddLink('')
        }

        CardService.create({
            id: Math.floor(Math.random() * Date.now()).toString(36),
            title,
            url,
            body,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        setCards(CardService.list())

        setTitle('')
        setUrl('')
        setBody('')

        handleCloseAddLink()
    }

    const handleEditLink = (e: React.FormEvent) => {
        e.preventDefault()

        if (!anchorId) return

        const card = CardService.find(anchorId)

        if (
            card?.title === titleEdit &&
            card?.url === urlEdit &&
            card?.body === bodyEdit
        ) {
            setTitleEdit('')
            setUrlEdit('')
            setBodyEdit('')

            handleCloseEditLink()
            return
        }

        if (!titleEdit) {
            setTitleErrorEditLink('Campo obrigatório')
            return
        } else {
            setTitleErrorEditLink('')
        }

        if (!urlEdit) {
            setUrlErrorEditLink('Campo obrigatório')
            return
        } else {
            setUrlErrorEditLink('')
        }

        if (!urlEdit.match(/^(http|https):\/\//)) {
            setUrlErrorEditLink('URL inválida')
            return
        } else {
            setUrlErrorEditLink('')
        }

        if (
            CardService.list().find(
                (c) => c.title === titleEdit && c.id !== anchorId
            )
        ) {
            setTitleErrorEditLink('Título já existente')
            return
        } else {
            setTitleErrorEditLink('')
        }

        if (
            CardService.list().find(
                (c) => c.url === urlEdit && c.id !== anchorId
            )
        ) {
            setUrlErrorEditLink('URL já existente')
            return
        } else {
            setUrlErrorEditLink('')
        }

        CardService.update({
            id: anchorId,
            title: titleEdit,
            url: urlEdit,
            body: bodyEdit,
            createdAt: card?.createdAt || new Date(),
            updatedAt: new Date(),
        })

        setCards(CardService.list())

        setTitleEdit('')
        setUrlEdit('')
        setBodyEdit('')

        handleCloseEditLink()
    }

    const handleDeleteLink = () => {
        CardService.delete(anchorId)
        setCards(CardService.list())
        setOpenDialog(false)
        handleClose()
    }

    const openContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
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
            <Button icon="plus" onClick={handleOpenAddLink}>
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
                <Modal open={openAddLink} onClose={handleCloseAddLink}>
                    <Box className="model-create">
                        <Typography variant="h6" component="h2">
                            Adicionar link
                        </Typography>
                        <form onSubmit={handleAddLink}>
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
                                error={!!titleErrorAddLink}
                                helperText={titleErrorAddLink}
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
                                error={!!urlErrorAddLink}
                                helperText={urlErrorAddLink}
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

                <Modal open={openEditLink} onClose={handleCloseEditLink}>
                    <Box className="model-create">
                        <Typography variant="h6" component="h2">
                            Editar link
                        </Typography>
                        <form onSubmit={handleEditLink}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Título"
                                value={titleEdit}
                                className="model-create-input"
                                onChange={(e) => setTitleEdit(e.target.value)}
                                variant="filled"
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                                error={!!titleErrorEditLink}
                                helperText={titleErrorEditLink}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="URL"
                                value={urlEdit}
                                onChange={(e) => setUrlEdit(e.target.value)}
                                variant="filled"
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                                error={!!urlErrorEditLink}
                                helperText={urlErrorEditLink}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Descrição"
                                multiline
                                rows={4}
                                value={bodyEdit}
                                onChange={(e) => setBodyEdit(e.target.value)}
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
                                    onClick={handleCloseEditLink}
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
                        onClick={handleOpenEditLink}
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
                        <Button onClick={handleDeleteLink}>Deletar</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </section>
    )
}

export default Main
