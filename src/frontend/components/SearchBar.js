import React, { useState, useEffect, useCallback } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Autocomplete from '@mui/joy/Autocomplete';
import { popularCityNames } from '../../config';
import fetchCitySuggestions from '../../backend/weatherAPI/FetchCitySuggestions';

//function to only fetch once the input has stopped
function debounce(func, delay) {
    let timeoutId
    return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export default function SearchBar({ onCitySelect }) {
    const [ inputValue, setInputValue ] = useState('')
    const [ suggestions, setSuggestions ] = useState([])
    const [ selectedValue, setSelectedValue ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchCitySuggestions = useCallback(
        debounce(async (query) => {
            if(!query) {
                setSuggestions([])
                setLoading(false)
                return
            }
            setLoading(true)
            try {
                const fetchedSuggestions = await fetchCitySuggestions(query)
                console.log(fetchedSuggestions)
                setSuggestions(fetchedSuggestions)
            } catch (error) {
                console.error('SearchBar: Failed to fetch city suggestions:', error)
                setSuggestions([])
            }
            setLoading(false)
        }, 500),
        []
    )

    useEffect(() => {
        debouncedFetchCitySuggestions(inputValue)
    }, [inputValue, debouncedFetchCitySuggestions])

    return (
        <Autocomplete
            placeholder={popularCityNames[Math.floor(Math.random() * popularCityNames.length)]}
            value={selectedValue}
            onChange={(newValue) => {
                setSelectedValue(newValue)
                if (onCitySelect) {
                    onCitySelect(newValue)
                }
                setSuggestions([])
                setInputValue('')
            }}
            inputValue={inputValue}
            onInputChange={(newInputValue) => {
                setInputValue(newInputValue)
            }}
            options={suggestions.map((suggestion) => suggestion.name)}
            disableClearable
            freeSolo
            type='search'
            loading={loading}
            endDecorator={loading ? <CircularProgress size="sm" /> : null}
        />
    )
}