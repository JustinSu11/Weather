import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { popularCityNames } from '../../config';
import fetchCitySuggestions from '../../backend/weatherAPI/FetchCitySuggestions';

export default function SearchBar() {
    const { value, setValue } = useState(null)
    const { inputValue, setInputValue } = useState('')
    const { suggestions, setSuggestions } = useState([])

    return (
        <Autocomplete
            placeholder={popularCityNames[Math.floor(Math.random() * popularCityNames.length)]}
            value={value}
            onChange={(newValue) => {
                setValue(newValue)
            }}
            inputValue={inputValue}
            onInputChange={async (newInputValue) => {
                setTimeout(async () => {
                    setInputValue(newInputValue)
                    setSuggestions(await fetchCitySuggestions(newInputValue))
                }, 500)
            }}
            options={suggestions.length > 0 ? suggestions.map((option) => option.name) : ['City not found']}
        />
    )
}