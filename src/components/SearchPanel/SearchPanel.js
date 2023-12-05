import { useState } from 'react'

import useMoviesContext from '../../context/useMoviesContext'

import './SearchPanel.scss'

const SearchPanel = () => {
    const { setSeacthQuery, setCurrentPage } = useMoviesContext()
    const [localInputValue, setLocalInputValue] = useState('')

    const onHandleSubmit = (e) => {
        e.preventDefault()
        if (localInputValue.trim().length !== 0) {
            setSeacthQuery(localInputValue)
            setCurrentPage(1)
        }
    }

    return(
        <form onSubmit={onHandleSubmit}>
            <input 
                   onChange={e => setLocalInputValue(e.target.value)}
                   value={localInputValue}
                   type='text' 
                   required 
                   placeholder='Search'/>
            <input type='submit'/>
        </form>
    )
}

export default SearchPanel