import { createTheme } from '@mui/material'

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
        MuiFormControl: {
            styleOverrides: {
                root: {
                    minWidth: 120,
                    backgroundColor: 'var(--color-white)',
                    borderRadius: '5px',
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: 'var(--primary-blue)',
                    color: 'var(--color-white)',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    transition: '200ms',
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--darker-blue)',
                    '&.Mui-selected': {
                        backgroundColor: 'var(--primary-blue)',
                        color: 'var(--color-white)',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'var(--primary-blue)',
                        color: 'var(--color-white)',
                    },
                    '&:hover': {
                        backgroundColor: 'var(--primary-blue)',
                        color: 'var(--color-white)',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#ffffff1a',
                    },
                },
            },
        },
    },
})

export default theme
