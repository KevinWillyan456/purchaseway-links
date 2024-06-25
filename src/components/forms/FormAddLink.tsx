import { Box, Modal, TextField, Typography } from '@mui/material'
import Button from '../components/Button'

interface FormAddLinkProps {
    openAddLink: boolean
    handleCloseAddLink: () => void
    handleAddLink: (e: React.FormEvent) => void
    title: string
    setTitle: (title: string) => void
    titleErrorAddLink: string
    url: string
    setUrl: (url: string) => void
    urlErrorAddLink: string
    body: string
    setBody: (body: string) => void
}

function FormAddLink({
    openAddLink,
    handleCloseAddLink,
    handleAddLink,
    title,
    setTitle,
    titleErrorAddLink,
    url,
    setUrl,
    urlErrorAddLink,
    body,
    setBody,
}: FormAddLinkProps) {
    return (
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
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button type="submit">Salvar</Button>
                        <Button type="button" onClick={handleCloseAddLink}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default FormAddLink
