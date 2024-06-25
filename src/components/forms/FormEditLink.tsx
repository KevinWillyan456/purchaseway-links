import { Box, Modal, TextField, Typography } from '@mui/material'
import Button from '../components/Button'

interface FormEditLinkProps {
    openEditLink: boolean
    handleCloseEditLink: () => void
    handleEditLink: (e: React.FormEvent) => void
    titleEdit: string
    setTitleEdit: (title: string) => void
    titleErrorEditLink: string
    urlEdit: string
    setUrlEdit: (url: string) => void
    urlErrorEditLink: string
    bodyEdit: string
    setBodyEdit: (body: string) => void
}

function FormEditLink({
    openEditLink,
    handleCloseEditLink,
    handleEditLink,
    titleEdit,
    setTitleEdit,
    titleErrorEditLink,
    urlEdit,
    setUrlEdit,
    urlErrorEditLink,
    bodyEdit,
    setBodyEdit,
}: FormEditLinkProps) {
    return (
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
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button type="submit">Salvar</Button>
                        <Button type="button" onClick={handleCloseEditLink}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default FormEditLink
