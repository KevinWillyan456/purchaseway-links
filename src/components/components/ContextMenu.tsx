import { Menu, MenuItem } from '@mui/material'

interface ContextMenuProps {
    anchorEl: null | HTMLElement
    handleClose: () => void
    handleOpenEditLink: () => void
    handleOpenDialog: () => void
}

function ContextMenu({
    anchorEl,
    handleClose,
    handleOpenEditLink,
    handleOpenDialog,
}: ContextMenuProps) {
    return (
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
            <MenuItem onClick={handleOpenDialog} style={{ color: '#e90215' }}>
                Deletar
            </MenuItem>
        </Menu>
    )
}

export default ContextMenu
