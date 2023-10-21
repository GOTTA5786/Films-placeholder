import { useState, useCallback } from 'react'
import FilmCard from '../../components/FilmCard/FilmCard'
import styles from './MainPage.module.css'
import { Film } from '../../types/films'
import Filter from '../../components/Filter/Filter'

const MainPage: React.FC = () => {
    const [films, setFilms] = useState<Film[]>([])

    const getFilms = useCallback(
        (films: Film[]) => {
            setFilms(films)
        },
        [setFilms]
    )
    
    return (
    <div className={styles.container}>
        <Filter setMainPageContent={getFilms}/>
        <div className={styles.films}>
            {films.map(item => <FilmCard key={item.id} {...item}/>)}
        </div>
    </div>
    )
}

export default MainPage