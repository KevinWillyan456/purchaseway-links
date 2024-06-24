import { TextField } from '@mui/material'

interface SearchProps {
    searchText: string
    onSearchChange: (text: string) => void
}

function Search({ searchText, onSearchChange }: SearchProps) {
    return (
        <TextField
            label="Pesquisar"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="filled"
            fullWidth
        />
    )
}

export default Search
