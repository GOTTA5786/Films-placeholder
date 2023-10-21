import styles from './CommentCard.module.css'

interface Props{
    comment: string
}
const CommentCard: React.FC<Props> = (props) => {
    return (
        <p className={styles.container}>{props.comment}</p>
    )
}
export default CommentCard