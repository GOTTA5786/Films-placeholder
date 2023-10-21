import { useState } from 'react'
import Star from './Star/Star'
import styles from './StarsRating.module.css'

import { useDispatch } from 'react-redux'
import { setUserRating } from '../../redux/action-creators/films'

interface Rating {
  id: number
  userRating: number | undefined
}

const StarsRating: React.FC<Rating> = (props) => {
  const dispatch = useDispatch()
  const [hover, setHover] = useState<number>(0)
  let currentRating = 0

  if (props.userRating) currentRating = props.userRating

    return (  
        <div className={styles.rating}>
        {[...Array(10)].map((star, index) => {
          star = star
          const value = index + 1;
  
          return (
            <div key={value} onMouseOver={() => setHover(value)} onMouseLeave={() => setHover(currentRating)} onClick={() => dispatch(setUserRating(props.id, value))} >
                <Star value={value} selectedValue={hover ? hover : currentRating}/>
            </div>
          );
        })}
        <p>{currentRating}/10</p>
      </div>
    )
}
export default StarsRating