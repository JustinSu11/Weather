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

// SearchBar component that gets an array of city suggestions when there is a pause in user input
export default function SearchBar({ onCitySelect }) {
    const [ inputValue, setInputValue ] = useState('')
    const [ suggestions, setSuggestions ] = useState([])
    const [ selectedValue, setSelectedValue ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    //This stops suggestions from being fetch on every input change and only fetches suggestions when the user has stopped typing
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

    //Calls the above function whenever the input value changes
    useEffect(() => {
        debouncedFetchCitySuggestions(inputValue)
    }, [inputValue, debouncedFetchCitySuggestions])

    //Autocomplete component from MUI that acts as the search bar
    //also displays a placeholder text with a random popular city name
    return (
        <Autocomplete
            placeholder={popularCityNames[Math.floor(Math.random() * popularCityNames.length)]}
            value={selectedValue}
            onChange={(event, newValue) => {
                setSelectedValue(newValue)
                if (onCitySelect) {
                    onCitySelect(newValue)
                }
                setSuggestions([])
                setInputValue('')
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                console.log('Input changed:', newInputValue)
                setInputValue(newInputValue);
            }}
            options={ inputValue !== '' && loading === false && suggestions.length > 0 ? suggestions.map((suggestion) => suggestion.name) : ['No suggestions found']}
            freeSolo
            type='search'
            loading={loading}
            endDecorator={loading ? <CircularProgress size="sm" /> : null}
        />
    )
}