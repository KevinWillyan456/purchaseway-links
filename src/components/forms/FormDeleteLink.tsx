import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import Button from '../components/Button'

interface FormDeleteLinkProps {
    openDialog: boolean
    handleCloseDialog: () => void
    handleDeleteLink: () => void
}

function FormDeleteLink({
    openDialog,
    handleCloseDialog,
    handleDeleteLink,
}: FormDeleteLinkProps) {
    return (
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
            <DialogTitle id="alert-dialog-title">Confirmar deleção</DialogTitle>
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
    )
}

export default FormDeleteLink
