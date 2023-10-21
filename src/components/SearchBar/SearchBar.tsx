import styles from './SearchBar.module.css'

interface Props {
    setFilterSearchParams: (query: string) => void
}

const SearchBar: React.FC<Props> = (props) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        props.setFilterSearchParams(e.target.value)
    }

    return (
        <div className={styles.container}>
            <label>Поиск по названию: </label>
            <input  placeholder='Введите название фильма' type='text' onChange={e => handleChange(e)} ></input>
        </div>
    )
}
export default SearchBar