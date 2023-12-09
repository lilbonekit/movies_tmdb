import { useEffect, useState } from 'react'

import { Close } from '../Icons/Icons'

import useMoviesContext from '../../context/useMoviesContext'

import './SearchPanel.scss'

const SearchPanel = () => {
    const { 
        setSearchQuery,
        setCurrentPage, 
        isPerfomedSearch,
        searchQuery 
        } = useMoviesContext()

    const [localInputValue, setLocalInputValue] = useState('')
    const [validationError, setValidationError] = useState('')

    useEffect(() => {
        if(localInputValue.length > 50) {
            setValidationError('Too much')
        } else {
            setValidationError('')
        }
    }, [localInputValue])

    const syncValue = (e) => {
        setLocalInputValue(e.target.value)
        if(localInputValue.length > 50) {
            setValidationError('Too much')
        }
    }

    const onHandleSubmit = (e) => {
        e.preventDefault()
        setValidationError('')
        // Валидация на пробелы
        if (localInputValue.trim().length !== 0 && localInputValue.length < 50) {
            setSearchQuery(localInputValue)
            setCurrentPage(1)
        }
        // Валдиация на длину поиска
        // Я сюда скорее всего никогда не зайду
        if (localInputValue.trim().length > 50) {
            setValidationError('Too much')
        }
    }

    const clearInput = () => {
        setLocalInputValue('')
        setValidationError('')
    }

    const resetSearch = () => {
        setLocalInputValue('')
        setSearchQuery('')
        setValidationError('')
    }

    return(
        <View 
            onHandleSubmit={onHandleSubmit}
            syncValue={syncValue}
            localInputValue={localInputValue}
            clearInput={clearInput}
            isPerfomedSearch={isPerfomedSearch}
            searchQuery={searchQuery}
            resetSearch={resetSearch}
            validationError={validationError}/>
    )
}

const View = ({onHandleSubmit,syncValue, localInputValue, clearInput, isPerfomedSearch, searchQuery, resetSearch, validationError}) => {
    return(
        <div className='search'>
            <form onSubmit={onHandleSubmit} className='search-form'>
                <div className='label'>
                    <input 
                        onChange={syncValue}
                        value={localInputValue}
                        type='text' 
                        required 
                        placeholder='Search...'/>
                    {
                        localInputValue.trim().length !== 0 ?
                            <Close className='close' clear={clearInput}/> :
                            null
                    }
                    </div>
                <input 
                    type='submit' 
                    disabled={validationError.length > 0}
                    className={validationError.length > 0 ? 'disabled' : null}/>
            </form>
            <div className="results">
                    {isPerfomedSearch} results
                    {
                        searchQuery.length !== 0 ?
                        <div className='add-info'>
                            <span>for</span>
                            <button className='results-button' onClick={resetSearch}>
                                <p>{searchQuery}</p>
                                <Close className='close-result'/>
                            </button>
                        </div> :
                        null
                    }
            </div>
        </div>
    )
}

export default SearchPanel