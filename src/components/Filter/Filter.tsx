
import { useState, useEffect, useCallback } from 'react'
import { useAppSelector } from '../../redux/store/store'
import styles from './Filter.module.css'
import { handleLength, handleRating } from '../../helpers/inputValidators/inputValidators'
import { Film } from '../../types/films'
import SearchBar from '../SearchBar/SearchBar'

interface IFilter {
    setMainPageContent: (films: Film[]) => void,
}

enum SortParams {
    rating = 'rating',
    appendDate = 'appendDate',
    length = 'length'

}

const Filter: React.FC<IFilter> = (props) => {
    const data = useAppSelector(state => state.films)
    
    const films = [...data.items.values()]

    const [sortParams, setSortParams] = useState<string>(SortParams.rating)

    const [searchParams, setSearchParams] = useState<string>('')

    const [minRating, setMinRating] = useState<string>('')
    const [maxRating, setMaxRating] = useState<string>('')

    const [minLength, setMinLength] = useState<string>('')
    const [maxLength, setMaxLength] = useState<string>('')
    
    useEffect(() => {
      props.setMainPageContent(handleAllFilters(films))
    }, [data, maxLength, maxRating, minLength, minRating, sortParams, searchParams])

    const searchCallback = useCallback(
        (query: string) => {
            setSearchParams(query)
        },
        [setSearchParams]
    )

    function search(films: Film[]){
        if (searchParams !== ''){
            return films.filter(item => item.title.toUpperCase().includes(searchParams.toUpperCase()))
        }
        return films
    }

    function sort(films: Film[]){
        switch (sortParams) {
            case SortParams.appendDate:
                return films.sort((a,b) => b.appendDate - a.appendDate)

            case SortParams.length:
                return films.sort((a,b) => Number(b.length) - Number(a.length))

            case SortParams.rating:
                return films.sort((a,b) => Number(b.rating) - Number(a.rating))

            default:
                return films
        }
    }
    
    function filter(films: Film[]){
        if (minRating !== ''){
            films = films.filter(item => Number(item.rating) >= Number(minRating))
        }
        if (maxRating !== ''){
            films = films.filter(item => Number(item.rating) <= Number(maxRating))
        }
        if (minLength !== ''){
            films = films.filter(item => Number(item.length) >= Number(minLength))
        }
        if (maxLength !== ''){
            films = films.filter(item => Number(item.length) <= Number(maxLength))
        }
        return films
    }

    
    function handleAllFilters(films: Film[]){ 
        let filteredFilms = search(films)
        filteredFilms = filter(filteredFilms)
        return sort(filteredFilms)
    }

    return (
    <div className={styles.container}>
        <SearchBar setFilterSearchParams={searchCallback}></SearchBar>
        <div className={styles.sort}>
            <label>Сортировать по:</label>
            <select onChange={e => setSortParams(e.target.value) }>
                <option value ={SortParams.rating}>рейтинг</option>
                <option value ={SortParams.appendDate}>дате добавления</option>
                <option value ={SortParams.length}>длительности</option>
            </select>
            
            
        </div>
        <div className={styles.filter}>
            <label>Фильтровать по длительности:</label>
            
            <div className={styles.inputContainer}>
                <label>От: <input type={'text'} value={minLength} onChange={e => handleLength(setMinLength, e) }/> мин</label>
                <label>до: <input type={'text'} value={maxLength} onChange={e =>  handleLength(setMaxLength, e) }/> мин</label>
            </div>
        </div>
        <div className={styles.filter}>
            <label>Фильтровать по рейтингу:</label>
            <div className={styles.inputContainer}>
                <label>От: <input type={'text'} value={minRating} onChange={e =>  handleRating(setMinRating, e) }/> звезд</label>
                <label>до: <input type={'text'} value={maxRating} onChange={e =>  handleRating(setMaxRating, e) }/> звезд</label>
            </div>
        </div>
    </div>
    )
}
export default Filter