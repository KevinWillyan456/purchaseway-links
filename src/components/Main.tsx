import {
    Badge,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import React, { useState } from 'react'
import { FaListUl } from 'react-icons/fa'
import { IoGrid } from 'react-icons/io5'
import CardModel from '../models/CardModel'
import TypesLayoutMode from '../models/LayoutMode'
import TypesOrderBy from '../models/TypesOrderBy'
import CardService from '../services/CardService'
import './Main.css'
import Button from './components/Button'
import Card from './components/Card'
import ContextMenu from './components/ContextMenu'
import Search from './components/Search'
import FormAddLink from './forms/FormAddLink'
import FormDeleteLink from './forms/FormDeleteLink'
import FormEditLink from './forms/FormEditLink'

function Main() {
    const [cards, setCards] = useState<CardModel[]>(CardService.list('asc'))

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

        if (CardService.list('asc').find((c) => c.title === title)) {
            setTitleErrorAddLink('Título já existente')
            return
        } else {
            setTitleErrorAddLink('')
        }

        if (CardService.list('asc').find((c) => c.url === url)) {
            setUrlErrorAddLink('URL já existente')
            return
        } else {
            setUrlErrorAddLink('')
        }

        CardService.create({
            id: Math.floor(Math.random() * Date.now()).toString(36),
            title,
            url: url.trim(),
            body,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        setCards(CardService.list(filter))

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
            url: urlEdit.trim(),
            body: bodyEdit,
            createdAt: card?.createdAt || new Date(),
            updatedAt: new Date(),
        })

        setCards(CardService.list(filter))

        setTitleEdit('')
        setUrlEdit('')
        setBodyEdit('')

        handleCloseEditLink()
    }

    const handleDeleteLink = () => {
        CardService.delete(anchorId)
        setCards(CardService.list(filter))
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

    const [searchText, setSearchText] = useState<string>('')

    const handleSearchChange = (text: string) => {
        setSearchText(text)
    }

    const searchedCards = cards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchText.toLowerCase()) ||
            card.body.toLowerCase().includes(searchText.toLowerCase()) ||
            card.url.toLowerCase().includes(searchText.toLowerCase())
    )

    const [filter, setFilter] = useState<TypesOrderBy>('asc')

    const handleChangeFilter = (event: SelectChangeEvent) => {
        const value = event.target.value as TypesOrderBy

        setFilter(value)

        if (value === 'asc') {
            setCards(CardService.list('asc'))
        }

        if (value === 'desc') {
            setCards(CardService.list('desc'))
        }

        if (value === 'date') {
            setCards(CardService.list('date'))
        }

        setSearchText('')
    }

    const [alignment, setAlignment] = useState<TypesLayoutMode>(
        CardService.getlayoutMode()
    )

    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: TypesLayoutMode | null
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment)
            CardService.setLayoutMode(newAlignment)
        }
    }

    return (
        <section className="main">
            <div className="title">Purchaseway Links</div>
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap={'wrap' as const}
                alignItems="center"
                mb={2}
                gap={2}
            >
                <Badge badgeContent={cards.length}>
                    <Button icon="plus" onClick={handleOpenAddLink}>
                        Novo
                    </Button>
                </Badge>

                <Box display="flex" alignItems="center" gap={2}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="list" aria-label="left aligned">
                            <FaListUl />
                        </ToggleButton>

                        <ToggleButton value="grid" aria-label="centered">
                            <IoGrid />
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <FormControl variant="filled">
                        <InputLabel id="filter-label">Filtros</InputLabel>
                        <Select
                            labelId="filter-label"
                            id="filter-select"
                            value={filter}
                            label="Filtros"
                            onChange={handleChangeFilter}
                        >
                            <MenuItem value={'asc'}>A-Z</MenuItem>
                            <MenuItem value={'desc'}>Z-A</MenuItem>
                            <MenuItem value={'date'}>Data</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Search
                    searchText={searchText}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            <section
                className="container-cards"
                style={
                    alignment === 'grid'
                        ? {
                              display: 'grid',
                              gridTemplateColumns:
                                  'repeat(auto-fill, minmax(300px, 1fr))',
                              gap: '40px',
                          }
                        : {
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '30px',
                          }
                }
            >
                {cards.length === 0 && (
                    <div className="empty">Nenhum link cadastrado</div>
                )}

                {searchedCards.length === 0 && cards.length > 0 && (
                    <div className="empty">Nenhum link encontrado</div>
                )}

                {searchedCards.map((data) => (
                    <Card
                        card={data}
                        key={data.id}
                        openContextMenu={openContextMenu}
                        setAnchorId={setAnchorId}
                    />
                ))}
            </section>

            <FormAddLink
                openAddLink={openAddLink}
                handleCloseAddLink={handleCloseAddLink}
                title={title}
                setTitle={setTitle}
                url={url}
                setUrl={setUrl}
                body={body}
                setBody={setBody}
                titleErrorAddLink={titleErrorAddLink}
                urlErrorAddLink={urlErrorAddLink}
                handleAddLink={handleAddLink}
            />

            <FormEditLink
                openEditLink={openEditLink}
                handleCloseEditLink={handleCloseEditLink}
                titleEdit={titleEdit}
                setTitleEdit={setTitleEdit}
                urlEdit={urlEdit}
                setUrlEdit={setUrlEdit}
                bodyEdit={bodyEdit}
                setBodyEdit={setBodyEdit}
                titleErrorEditLink={titleErrorEditLink}
                urlErrorEditLink={urlErrorEditLink}
                handleEditLink={handleEditLink}
            />

            <ContextMenu
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleOpenDialog={handleOpenDialog}
                handleOpenEditLink={handleOpenEditLink}
            />

            <FormDeleteLink
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleDeleteLink={handleDeleteLink}
            />
        </section>
    )
}

export default Main
