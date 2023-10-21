import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './AddComment.module.css'
import { addComment } from '../../redux/action-creators/films'

interface Props{
    filmId: number
}

const AddComment: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const [text, setText] = useState<string>('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        dispatch(addComment(props.filmId, text))
        setText('')
    }

    return (
    <div className={styles.container}>
        <label>Оставить комментарий: </label>
        <form onSubmit={e => handleSubmit(e)}>
            <textarea value={text} required onChange={e => setText(e.target.value)}></textarea>
            <input className={styles.submit} type='submit' value='отправить'></input>
        </form>
    </div>
    )
}
export default AddComment