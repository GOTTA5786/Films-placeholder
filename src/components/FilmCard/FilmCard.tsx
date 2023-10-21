import { Link } from 'react-router-dom';
import { getDateFromTimespamt } from '../../helpers/helpers';
import { Film } from '../../types/films'
import StarsRating from '../StarsRating/StarsRating';
import styles from './FilmCard.module.css'


const FilmCard: React.FC<Film> = (film) => {
    return (
    <div className={styles.container}>
        <Link className={styles.link} to={`film/${film.id}`}><img className={styles.poster} src={film.poster} ></img></Link>
        <Link className={styles.link} to={`film/${film.id}`}><h1>{film.title}</h1></Link>
        <div className={styles.rating}>
            <p>{film.rating}</p>
            <div><StarsRating id={film.id} userRating={film.userRating}  /></div>
        </div>
        <p className={styles.description}>Описание: {film.description}</p>
        <p>Длительность: {film.length} минут</p>
        <p>Дата добавления: {getDateFromTimespamt(film.appendDate)}</p>
    </div>
    )
}
export default FilmCard