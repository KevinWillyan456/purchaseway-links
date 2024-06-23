import { TextField } from '@mui/material'

interface SearchProps {
    searchText: string
    onFilterChange: (text: string) => void
}

function Search({ searchText, onFilterChange }: SearchProps) {
    return (
        <TextField
            sx={{
                '& .MuiInputBase-input': {
                    height: '18px',
                },
            }}
            label="Pesquisar"
            value={searchText}
            onChange={(e) => onFilterChange(e.target.value)}
            variant="filled"
            fullWidth
        />
    )
}

export default Search
