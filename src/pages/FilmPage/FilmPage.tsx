import { useParams } from 'react-router'
import styles from './FilmPage.module.css'
import { useAppSelector } from '../../redux/store/store'
import { Film } from '../../types/films'
import StarsRating from '../../components/StarsRating/StarsRating'
import { getDateFromTimespamt } from '../../helpers/helpers'
import { Link } from 'react-router-dom'
import CommentCard from '../../components/CommentCard/CommentCard'
import AddComment from '../../components/AddComment/AddComment'


export const FilmPage: React.FC = () => {
    const { id } = useParams()
    const { items } = useAppSelector(state => state.films)
    let film: Film | undefined

    if (id && items){
        film = items.get(Number(id))
    }
    console.log(film);
    if (film) return (
    <div className={styles.container}>
        <div className={styles.content}>
            <img className={styles.poster} src={film.poster.indexOf('blob') === 0 ? film.poster : `/${film.poster}`}></img>
            <h1>{film.title}</h1>
            <div className={styles.rating}>
                <p>{film.rating}</p>
                <div><StarsRating id={film.id} userRating={film.userRating}  /></div>
            </div>
            <p>Описание: {film.description}</p>
            <p>Длительность: {film.length} минут</p>
            <p>Дата добавления: {getDateFromTimespamt(film.appendDate)}</p>
            <AddComment filmId={film.id}/>
            {film.comments.length !== 0
            ?<div className={styles.comments}>
                <p>Комментарии:</p>
                {film.comments.map((item, index) => <CommentCard key={index} comment={item}/>)}
             </div>
            : <></>}
        </div>
    </div>
    )
    
    
    return (
        <div className={styles.container}>
          <div className={styles.content}>
          <Link className={styles.link} to={'/'}>{`< to main page`}</Link>
          We lost this film</div>
        </div>
      )
}
