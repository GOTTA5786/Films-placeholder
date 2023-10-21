import { useRef, useState } from 'react'
import styles from './AddNewFilmPage.module.css'
import { Film } from '../../types/films'
import { useDispatch } from 'react-redux'
import { uploadFilm } from '../../redux/action-creators/films'
import { handleLength, handleRating } from '../../helpers/inputValidators/inputValidators'


export const AddNewFilmPage: React.FC = () => {
    const dispatch = useDispatch()

    const inputFileRef = useRef(null)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [length, setLength] = useState<string>('')
    const [rating, setRating] = useState<string>('')
    const [poster, setPoster] = useState<string>('')

    

   function handleFile(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files?.length === 0 || e.target.files === null) return
    setPoster(URL.createObjectURL(e.target.files[0]))
   }

   function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const date = new Date
    const timestamp = date.getTime()

    const film: Film = {
        id: timestamp,
        appendDate: timestamp,
        description: description,
        comments: [],
        length: length,
        poster: poster,
        rating: rating.length === 1 ? rating + '.0' : rating,
        title: title,
    }

    dispatch(uploadFilm(film))

    setTitle('')
    setDescription('')
    setLength('')
    setRating('')
    setPoster('')
    setIsSubmit(true)
    //@ts-ignore
    inputFileRef.current.value = '';
    setTimeout(() => setIsSubmit(false), 3000)
   }
   
   

    return (
        <div className={styles.container}>
            <form className={styles.form}  onSubmit={e => handleSubmit(e)}>
                {isSubmit ? <p className={styles.success}>Фильм успешно загружен</p> : <></>}
                <img data-testid='addFilmImage' src={poster}></img>
                <label>Постер:<input type='file' data-testid='addFilmPoster' ref={inputFileRef} required accept="image/png, image/jpeg" onChange={e => handleFile(e)}></input></label>
                <label>Название:<input type='text' data-testid='addFilmTitle' placeholder='Название' value={title} required onChange={e => setTitle(e.target.value)}></input></label>
                <label>Описание:<textarea className={styles.description} data-testid='addFilmDescription' placeholder='Описание' value={description} required onChange={e => setDescription(e.target.value)}></textarea></label>
                <label>Длительность:<input type='text' data-testid='addFilmLength' placeholder='Длительность фильма в минутах' required value={length} onChange={e => handleLength(setLength, e)}></input></label>
                <label>Рейтинг:<input type='number' data-testid='addFilmRating' placeholder='Рейтинг фильма от 1 до 10' step={0.1} min='1' max='10' required value={rating} onChange={e => handleRating(setRating, e)}></input></label>
                <input className={styles.submit} type='submit' data-testid='addFilmSubmit' value='отправить'></input>
            </form>
            
        </div>
    )
}
